import { ISchema } from '@formily/react'

export const CSSStyle: ISchema = {
  type: 'object',
  properties: {
    width: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    height: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    display: {
      'x-component': 'DisplayStyleSetter',
    },
    background: {
      'x-component': 'BackgroundStyleSetter',
    },
    boxShadow: {
      'x-component': 'BoxShadowStyleSetter',
    },
    font: {
      'x-component': 'FontStyleSetter',
    },
    margin: {
      'x-component': 'BoxStyleSetter',
    },
    padding: {
      'x-component': 'BoxStyleSetter',
    },
    borderRadius: {
      'x-component': 'BorderRadiusStyleSetter',
    },
    border: {
      'x-component': 'BorderStyleSetter',
    },
    opacity: {
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
}
