import React, { memo } from 'react';
import { Row, Col, Slider, InputNumber, Button } from 'antd';

const SliderInput = ({
  onChange,
  value,
  max,
  min = 0,
  formatter,
  layout = { slider: 10, input: 14 }
}) => {
  return (
    <Row>
      <Col span={layout.slider}>
        <Slider value={value} max={max} min={min} onChange={onChange} />
      </Col>
      <Col span={layout.input}>
        <InputNumber
          min={0}
          max={max}
          style={{ margin: '0 6px' }}
          value={value}
          onChange={v => onChange(v)}
          formatter={formatter}
        />
        <Button icon='vertical-align-top' onClick={() => onChange(max)} />
      </Col>
    </Row>
  );
};

export default memo(SliderInput);
