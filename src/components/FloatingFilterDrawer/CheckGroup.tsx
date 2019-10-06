import React, { useState, useCallback, useEffect } from 'react';
import { Checkbox } from 'antd';
import { CheckboxOptionType, CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface ICheckGroupProps {
  checkedList: string[] | number[];
  onChangeCheckedList: (checkedList: CheckboxValueType[]) => void;
  optionList: CheckboxOptionType[];
  disabled: boolean;
}

const CheckGroup = ({
  checkedList,
  onChangeCheckedList,
  optionList,
  disabled,
}: ICheckGroupProps) => {
  const onCheckAllChange = useCallback(
    (e: CheckboxChangeEvent) => {
      onChangeCheckedList(
        e.target.checked ? optionList.map(item => item.value) : []
      );
    },
    [optionList, onChangeCheckedList]
  );

  const onChange = (checkedList: CheckboxValueType[]) => {
    onChangeCheckedList(checkedList);
  };

  return (
    <div>
      <Checkbox
        onChange={onCheckAllChange}
        checked={checkedList.length === optionList.length}
        style={{
          marginRight: 8,
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

export default CheckGroup;
