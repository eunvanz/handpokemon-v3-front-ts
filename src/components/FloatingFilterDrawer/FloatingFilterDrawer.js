import React, { memo } from 'react';
import { Collapse } from 'antd';
import FloatingDrawer from '../FloatingDrawer/index';
import { isScreenSize } from '../../libs/screenSize';
import CheckGroup from './CheckGroup';

const FloatingFilterDrawer = ({
  defaultActiveKey,
  onChange,
  filter,
  optionLists,
  filterActive
}) => {
  return (
    <FloatingDrawer
      icon='filter'
      buttonText={isScreenSize.xs() ? null : '필터'}
      active={filterActive}
      title='필터'
    >
      <Collapse bordered={false} defaultActiveKey={defaultActiveKey}>
        <Collapse.Panel header='보유여부' key='has'>
          <CheckGroup
            optionList={optionLists.has}
            onChangeCheckedList={checkedList => onChange('has', checkedList)}
            checkedList={filter.has}
            disabled={filter.disabled.indexOf('has') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='등급' key='gradeCd'>
          <CheckGroup
            optionList={optionLists.gradeCd}
            onChangeCheckedList={checkedList =>
              onChange('gradeCd', checkedList)
            }
            checkedList={filter.gradeCd}
            disabled={filter.disabled.indexOf('gradeCd') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='주속성' key='mainAttrCd'>
          <CheckGroup
            optionList={optionLists.mainAttrCd}
            onChangeCheckedList={checkedList =>
              onChange('mainAttrCd', checkedList)
            }
            checkedList={filter.mainAttrCd}
            disabled={filter.disabled.indexOf('mainAttrCd') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='부속성' key='subAttrCd'>
          <CheckGroup
            optionList={optionLists.subAttrCd}
            onChangeCheckedList={checkedList =>
              onChange('subAttrCd', checkedList)
            }
            checkedList={filter.subAttrCd}
            disabled={filter.disabled.indexOf('subAttrCd') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='코스트' key='cost'>
          <CheckGroup
            optionList={optionLists.cost}
            onChangeCheckedList={checkedList => onChange('cost', checkedList)}
            checkedList={filter.cost}
            disabled={filter.disabled.indexOf('cost') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='랭크' key='rankCd'>
          <CheckGroup
            optionList={optionLists.rankCd}
            onChangeCheckedList={checkedList => onChange('rankCd', checkedList)}
            checkedList={filter.rankCd}
            disabled={filter.disabled.indexOf('rankCd') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='세대' key='generation'>
          <CheckGroup
            optionList={optionLists.generation}
            onChangeCheckedList={checkedList =>
              onChange('generation', checkedList)
            }
            checkedList={filter.generation}
            disabled={filter.disabled.indexOf('generation') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='진화가능여부' key='evolutable'>
          <CheckGroup
            optionList={optionLists.evolutable}
            onChangeCheckedList={checkedList =>
              onChange('evolutable', checkedList)
            }
            checkedList={filter.evolutable}
            disabled={filter.disabled.indexOf('evolutable') > -1}
          />
        </Collapse.Panel>
        <Collapse.Panel header='수비배치여부' key='defense'>
          <CheckGroup
            optionList={optionLists.defense}
            onChangeCheckedList={checkedList =>
              onChange('defense', checkedList)
            }
            checkedList={filter.defense}
            disabled={filter.disabled.indexOf('defense') > -1}
          />
        </Collapse.Panel>
      </Collapse>
    </FloatingDrawer>
  );
};

export default memo(FloatingFilterDrawer);
