import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col } from 'antd';
import MonCard from '../../components/MonCard';

interface IThirdStepProps {
  show: boolean;
  onPick: () => Promise<any>;
  startPicks?: any[];
  codes: any[];
  disabled: boolean;
}

const ThirdStep = ({
  show,
  onPick,
  startPicks,
  codes,
  disabled,
}: IThirdStepProps) => {
  const [picking, setPicking] = useState(false);

  const handleOnClickPick = useCallback(() => {
    setPicking(true);
    onPick().then(() => setPicking(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form style={{ display: show ? 'block' : 'none' }}>
      {!startPicks && (
        <div style={{ height: '30vh', position: 'relative' }}>
          <div className='center-middle-aligner'>
            <div className='text-center'>
              <h3>모험을 함께 시작할 친구들을 채집해볼까?</h3>
              <Button type='primary' size='large' onClick={onPick}>
                채집하기
              </Button>
            </div>
          </div>
        </div>
      )}
      {startPicks && (
        <Row type='flex' justify='space-around' align='middle' gutter={6}>
          {startPicks.map((pick, idx) => (
            <Col span={8} key={idx}>
              <MonCard mon={pick} codes={codes} />
            </Col>
          ))}
        </Row>
      )}
      {startPicks && (
        <div className='text-center' style={{ marginTop: 24 }}>
          <Button
            type='primary'
            size='large'
            onClick={handleOnClickPick}
            loading={picking}
            icon='sync'
            disabled={disabled}
          >
            다시 채집하기
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ThirdStep;
