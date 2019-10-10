import React, { useMemo, useContext, useEffect } from 'react';
import { Collapse } from 'antd';
import FloatingDrawer from '../FloatingDrawer/index';
import { isScreenSize } from '../../libs/screenSize';
import CheckGroup from './CheckGroup';
import { observer } from 'mobx-react';
import { FilterKey } from '../../stores/collectionFilterStore';
import AppContext from '../../contexts/AppContext';
import { MASTER_CD } from '../../constants/codes';
import { toJS } from 'mobx';
import { ICodeSnapshotOut } from '../../stores/models/code';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const FloatingFilterDrawer = () => {
  const { codeStore, collectionFilterStore } = useContext(AppContext);
  const { collectionFilter } = collectionFilterStore;
  const { isCodeLoaded } = codeStore;

  useEffect(() => {
    if (isCodeLoaded && !collectionFilter) {
      collectionFilterStore.setFilter({
        gradeCd: codeStore.findDetailCdsInMasterCdGroup(MASTER_CD.MON_GRADE),
        mainAttrCd: codeStore.findDetailCdsInMasterCdGroup(MASTER_CD.MON_ATTRS),
        subAttrCd: [''].concat(codeStore.findDetailCdsInMasterCdGroup(
          MASTER_CD.MON_ATTRS
        ) as string[]),
        cost: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        rankCd: [''].concat(codeStore.findDetailCdsInMasterCdGroup(
          MASTER_CD.MON_RANK
        ) as string[]),
        generation: [1, 2, 3, 4, 5, 6, 7, 8],
        evolutable: ['Y', 'N'],
        defense: ['Y', 'N'],
        disabled: [],
      });
    }
  }, [isCodeLoaded, codeStore, collectionFilter, collectionFilterStore]);

  const optionLists = useMemo(() => {
    if (isCodeLoaded) {
      return {
        gradeCd: (codeStore.findMasterCdGroup(
          MASTER_CD.MON_GRADE
        ) as ICodeSnapshotOut[]).map(item => ({
          label: item.detailCdNm,
          value: item.detailCd,
        })),
        mainAttrCd: (codeStore.findMasterCdGroup(
          MASTER_CD.MON_ATTRS
        ) as ICodeSnapshotOut[]).map(item => ({
          label: item.detailCdNm,
          value: item.detailCd,
        })),
        subAttrCd: [{ label: '없음', value: '' }].concat(
          (codeStore.findMasterCdGroup(
            MASTER_CD.MON_ATTRS
          ) as ICodeSnapshotOut[]).map(item => ({
            label: item.detailCdNm,
            value: item.detailCd,
          }))
        ),
        cost: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(item => ({
          label: item,
          value: Number(item),
        })),
        rankCd: [{ label: '없음', value: '' }].concat(
          (codeStore.findMasterCdGroup(
            MASTER_CD.MON_RANK
          ) as ICodeSnapshotOut[]).map(item => ({
            label: item.detailCdNm,
            value: item.detailCd,
          }))
        ),
        generation: ['1', '2', '3', '4', '5', '6', '7', '8'].map(item => ({
          label: item,
          value: Number(item),
        })),
        evolutable: [
          { label: '가능', value: 'Y' },
          { label: '불가능', value: 'N' },
        ],
        defense: [
          { label: '배치됨', value: 'Y' },
          { label: '배치안됨', value: 'N' },
        ],
      };
    } else {
      return null;
    }
  }, [codeStore, isCodeLoaded]);

  const filterActiveInfo = useMemo(() => {
    if (collectionFilter && optionLists) {
      const filterKeys = Object.keys(toJS(collectionFilter)) as FilterKey[];
      const activeKeys = [];
      let active = false;
      filterKeys.forEach(key => {
        if (
          optionLists[key] &&
          collectionFilter[key] &&
          collectionFilter[key].length !== optionLists[key].length
        ) {
          activeKeys.push(key);
          active = true;
        }
      });
      if (activeKeys.length === 0) {
        activeKeys.push('gradeCd');
      }
      return {
        activeKeys,
        active,
      };
    } else {
      return {
        activeKeys: [],
        active: false,
      };
    }
  }, [collectionFilter, optionLists]);

  return (
    <FloatingDrawer
      icon='filter'
      buttonText={isScreenSize.xs() ? null : '필터'}
      active={filterActiveInfo.active}
      title='필터'
    >
      {collectionFilter && optionLists && (
        <Collapse
          bordered={false}
          defaultActiveKey={filterActiveInfo.activeKeys}
        >
          <Collapse.Panel header='등급' key={FilterKey.gradeCd}>
            <CheckGroup
              optionList={optionLists.gradeCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(FilterKey.gradeCd, checkedList)
              }
              checkedList={collectionFilter.gradeCd}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.gradeCd) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='주속성' key={FilterKey.mainAttrCd}>
            <CheckGroup
              optionList={optionLists.mainAttrCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(
                  FilterKey.mainAttrCd,
                  checkedList
                )
              }
              checkedList={collectionFilter.mainAttrCd}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.mainAttrCd) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='부속성' key={FilterKey.subAttrCd}>
            <CheckGroup
              optionList={optionLists.subAttrCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(
                  FilterKey.subAttrCd,
                  checkedList
                )
              }
              checkedList={collectionFilter.subAttrCd}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.subAttrCd) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='코스트' key={FilterKey.cost}>
            <CheckGroup
              optionList={optionLists.cost}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(FilterKey.cost, checkedList)
              }
              checkedList={collectionFilter.cost}
              disabled={collectionFilter.disabled.indexOf(FilterKey.cost) > -1}
            />
          </Collapse.Panel>
          <Collapse.Panel header='랭크' key={FilterKey.rankCd}>
            <CheckGroup
              optionList={optionLists.rankCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(FilterKey.rankCd, checkedList)
              }
              checkedList={collectionFilter.rankCd}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.rankCd) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='세대' key={FilterKey.generation}>
            <CheckGroup
              optionList={optionLists.generation}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(
                  FilterKey.generation,
                  checkedList
                )
              }
              checkedList={collectionFilter.generation}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.generation) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='진화가능여부' key={FilterKey.evolutable}>
            <CheckGroup
              optionList={optionLists.evolutable}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(
                  FilterKey.evolutable,
                  checkedList
                )
              }
              checkedList={collectionFilter.evolutable}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.evolutable) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='수비배치여부' key={FilterKey.defense}>
            <CheckGroup
              optionList={optionLists.defense}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionFilter.setFilterValue(FilterKey.defense, checkedList)
              }
              checkedList={collectionFilter.defense}
              disabled={
                collectionFilter.disabled.indexOf(FilterKey.defense) > -1
              }
            />
          </Collapse.Panel>
        </Collapse>
      )}
    </FloatingDrawer>
  );
};

export default observer(FloatingFilterDrawer);
