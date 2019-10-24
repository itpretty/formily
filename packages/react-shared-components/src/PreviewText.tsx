import React from 'react'
import { IPreviewTextProps } from './types'

export const PreviewText: React.FC<IPreviewTextProps> = props => {
  let value: any
  if (props.dataSource && props.dataSource.length) {
    let find = props.dataSource.filter(({ value }) =>
      Array.isArray(props.value)
        ? props.value.some(val => val == value)
        : props.value == value
    )
    value = find.map(item => item.label).join(' , ')
  } else {
    value = Array.isArray(props.value)
      ? props.value.join(' ~ ')
      : String(
          props.value === undefined || props.value === null ? '' : props.value
        )
  }
  return (
    <p className={`preview-text ${props.className || ''}`}>
      {props.addonBefore ? ' ' + props.addonBefore : ''}
      {props.innerBefore ? ' ' + props.innerBefore : ''}
      {props.addonTextBefore ? ' ' + props.addonTextBefore : ''}
      {!value ? 'N/A' : value}
      {props.addonTextAfter ? ' ' + props.addonTextAfter : ''}
      {props.innerAfter ? ' ' + props.innerAfter : ''}
      {props.addonAfter ? ' ' + props.addonAfter : ''}
    </p>
  )
}
