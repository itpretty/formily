import { ISchema } from '@formily/react'

export const CommonInputProperties = {
  addonBefore: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  addonAfter: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  prefix: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  suffix: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  allowClear: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  bordered: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },
  maxLength: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
  },
  placeholder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
}

export const Input: ISchema = {
  type: 'object',
  properties: CommonInputProperties,
}

export const Input_o_TextArea: ISchema = {
  type: 'object',
  properties: {
    ...CommonInputProperties,
    autoSize: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    showCount: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['BOOLEAN', 'EXPRESSION'],
      },
    },
  },
}
