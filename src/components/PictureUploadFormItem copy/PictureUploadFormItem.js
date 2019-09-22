import React, { useCallback } from 'react';
import { Form } from 'antd';
import PictureWall from '../PictureWall';

const PictureUploadFormItem = ({
  form,
  label,
  required,
  requiredMessage = '필수항목입니다.',
  name,
  max,
  useCrop,
  cropOptions,
  initialValue,
}) => {
  const normFile = useCallback(e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }, []);

  return (
    <Form.Item label={label} colon={false} required={required}>
      {form.getFieldDecorator(name, {
        valuePropName: 'fileList',
        getValueFromEvent: normFile,
        rules: [
          {
            required: required,
            message: requiredMessage,
          },
        ],
        initialValue,
      })(<PictureWall max={max} cropOptions={cropOptions} useCrop={useCrop} />)}
    </Form.Item>
  );
};

export default PictureUploadFormItem;
