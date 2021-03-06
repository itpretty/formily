import React, { Fragment, useRef, useLayoutEffect, useState } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'
import { isNum, isStr, isBool, isFn } from '@formily/shared'
import { Dialog, ConfigProvider } from '@alifd/next'
import { DialogProps } from '@alifd/next/lib/dialog'
import { usePrefixCls } from '../__builtins__'

type FormDialogContent =
  | React.ReactElement
  | ((resolve: () => any, reject: () => any) => React.ReactElement)

type ModalTitle = string | number | React.ReactElement

const isModalTitle = (props: any): props is ModalTitle => {
  return (
    isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props)
  )
}

const getModelProps = (props: any): DialogProps => {
  if (isModalTitle(props)) {
    return {
      title: props,
    }
  } else {
    return props
  }
}

export interface IFormDialog {
  open(props?: Formily.Core.Types.IFormProps): Promise<any>
  close(): void
}

export interface IFormDialogComponentProps {
  content: FormDialogContent
  resolve: () => any
  reject: () => any
}

export function FormDialog(
  title: DialogProps,
  content: FormDialogContent
): IFormDialog
export function FormDialog(
  title: ModalTitle,
  content: FormDialogContent
): IFormDialog
export function FormDialog(title: any, content: any): IFormDialog {
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
  }

  let contextProps = {}
  try {
    // @ts-ignore
    contextProps = ConfigProvider.getContext()
  } catch (e) {}

  const props = getModelProps(title)
  const modal = {
    ...props,
    style: {
      width: '40%',
      ...props.style,
    },
    afterClose: () => {
      props?.afterClose?.()
      ReactDOM.unmountComponentAtNode(env.root)
      env.root?.parentNode?.removeChild(env.root)
      env.root = undefined
    },
  }
  const component = (props: IFormDialogComponentProps) => {
    return (
      <Fragment>
        {isFn(props.content)
          ? props.content(props.resolve, props.reject)
          : props.content}
      </Fragment>
    )
  }
  const render = (visible = true, resolve?: () => any, reject?: () => any) => {
    ReactDOM.render(
      <ConfigProvider {...contextProps}>
        <Dialog
          {...modal}
          visible={visible}
          onClose={(trigger, e) => {
            modal?.onClose?.(trigger, e)
            formDialog.close()
          }}
          onCancel={(e) => {
            modal?.onCancel?.(e)
            formDialog.close()
          }}
          onOk={async (e) => {
            modal?.onOk?.(e)
            resolve()
          }}
        >
          <FormProvider form={env.form}>
            {React.createElement(component, {
              content,
              resolve,
              reject,
            })}
          </FormProvider>
        </Dialog>
      </ConfigProvider>,
      env.root
    )
  }
  document.body.appendChild(env.root)
  const formDialog = {
    open: (props: Formily.Core.Types.IFormProps) => {
      if (env.promise) return env.promise
      env.form = env.form || createForm(props)
      env.promise = new Promise((resolve) => {
        render(
          true,
          () => {
            env.form.submit((values: any) => {
              resolve(values)
              formDialog.close()
            })
          },
          () => {
            formDialog.close()
          }
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.root) return
      render(false)
    },
  }
  return formDialog
}

const DialogFooter: React.FC = (props) => {
  const ref = useRef<HTMLDivElement>()
  const [footer, setFooter] = useState<HTMLDivElement>()
  const footerRef = useRef<HTMLDivElement>()
  const prefixCls = usePrefixCls('dialog')
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}`)
    if (content) {
      if (!footerRef.current) {
        footerRef.current = content.querySelector(`.${prefixCls}-footer`)
        if (!footerRef.current) {
          footerRef.current = document.createElement('div')
          footerRef.current.classList.add(`${prefixCls}-footer`)
          content.appendChild(footerRef.current)
        }
      }
      setFooter(footerRef.current)
    }
  })

  footerRef.current = footer

  return (
    <div ref={ref} style={{ display: 'none' }}>
      {footer && createPortal(props.children, footer)}
    </div>
  )
}

FormDialog.Footer = DialogFooter

export default FormDialog
