import React, { memo, useState, useCallback, useEffect } from 'react';
import { Checkbox } from 'antd';

const CheckGroup = ({
  checkedList,
  onChangeCheckedList,
  optionList,
  disabled
}) => {
  const [interminate, setInterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setCheckAll(checkedList.length === optionList.length);
  }, [checkedList, optionList]);

  const onCheckAllChange = useCallback(
    e => {
      onChangeCheckedList(
        e.target.checked ? optionList.map(item => item.value) : []
      );
      setInterminate(false);
    },
    [optionList, onChangeCheckedList]
  );

  const onChange = checkedList => {
    onChangeCheckedList(checkedList);
    setInterminate(
      !!checkedList.length && checkedList.length < optionList.length
    );
  };

  return (
    <div>
      <Checkbox
        interminate={interminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        style={{
          marginRight: 8
        }}
        disabled={disabled}
      >
        전체
      </Checkbox>
      <Checkbox.Group
        options={optionList}
        value={checkedList}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default memo(CheckGroup);
