import React, { useMemo, useContext, useEffect } from 'react';
import { Collapse } from 'antd';
import FloatingDrawer from '../FloatingDrawer/index';
import { isScreenSize } from '../../libs/screenSize';
import CheckGroup from './CheckGroup';
import { observer } from 'mobx-react';
import { CollectionFilterKey } from '../../stores/collectionStore';
import AppContext from '../../contexts/AppContext';
import { MASTER_CD } from '../../constants/codes';
import { toJS } from 'mobx';
import { ICodeSnapshotOut } from '../../stores/models/code';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const FloatingFilterDrawer = () => {
  const { codeStore, collectionStore } = useContext(AppContext);
  const { collectionFilter } = collectionStore;
  const { codes } = codeStore;

  useEffect(() => {
    if (codes && !collectionFilter) {
      collectionStore.setCollectionFilter({
        has: ['Y'],
        gradeCd: codeStore.findDetailCdsInMasterCdGroup(
          MASTER_CD.MON_GRADE
        ) as string[],
        mainAttrCd: codeStore.findDetailCdsInMasterCdGroup(
          MASTER_CD.MON_ATTRS
        ) as string[],
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
  }, [codes, codeStore, collectionFilter, collectionStore]);

  const optionLists = useMemo(() => {
    if (codes) {
      return {
        has: [{ label: '보유', value: 'Y' }, { label: '미보유', value: 'N' }],
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
  }, [codeStore, codes]);

  const filterActiveInfo = useMemo(() => {
    if (collectionFilter && optionLists) {
      const filterKeys = Object.keys(
        toJS(collectionFilter)
      ) as CollectionFilterKey[];
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
      {collectionFilter && collectionStore && optionLists && (
        <Collapse
          bordered={false}
          defaultActiveKey={filterActiveInfo.activeKeys}
        >
          <Collapse.Panel header='보유여부' key={CollectionFilterKey.has}>
            <CheckGroup
              optionList={optionLists.has}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.has,
                  checkedList
                )
              }
              checkedList={collectionFilter.has}
              disabled={
                collectionFilter.disabled.indexOf(CollectionFilterKey.has) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='등급' key={CollectionFilterKey.gradeCd}>
            <CheckGroup
              optionList={optionLists.gradeCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.gradeCd,
                  checkedList
                )
              }
              checkedList={collectionFilter.gradeCd}
              disabled={
                collectionFilter.disabled.indexOf(CollectionFilterKey.gradeCd) >
                -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='주속성' key={CollectionFilterKey.mainAttrCd}>
            <CheckGroup
              optionList={optionLists.mainAttrCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.mainAttrCd,
                  checkedList
                )
              }
              checkedList={collectionFilter.mainAttrCd}
              disabled={
                collectionFilter.disabled.indexOf(
                  CollectionFilterKey.mainAttrCd
                ) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='부속성' key={CollectionFilterKey.subAttrCd}>
            <CheckGroup
              optionList={optionLists.subAttrCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.subAttrCd,
                  checkedList
                )
              }
              checkedList={collectionFilter.subAttrCd}
              disabled={
                collectionFilter.disabled.indexOf(
                  CollectionFilterKey.subAttrCd
                ) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='코스트' key={CollectionFilterKey.cost}>
            <CheckGroup
              optionList={optionLists.cost}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.cost,
                  checkedList
                )
              }
              checkedList={collectionFilter.cost}
              disabled={
                collectionFilter.disabled.indexOf(CollectionFilterKey.cost) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='랭크' key={CollectionFilterKey.rankCd}>
            <CheckGroup
              optionList={optionLists.rankCd}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.rankCd,
                  checkedList
                )
              }
              checkedList={collectionFilter.rankCd}
              disabled={
                collectionFilter.disabled.indexOf(CollectionFilterKey.rankCd) >
                -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel header='세대' key={CollectionFilterKey.generation}>
            <CheckGroup
              optionList={optionLists.generation}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.generation,
                  checkedList
                )
              }
              checkedList={collectionFilter.generation}
              disabled={
                collectionFilter.disabled.indexOf(
                  CollectionFilterKey.generation
                ) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel
            header='진화가능여부'
            key={CollectionFilterKey.evolutable}
          >
            <CheckGroup
              optionList={optionLists.evolutable}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.evolutable,
                  checkedList
                )
              }
              checkedList={collectionFilter.evolutable}
              disabled={
                collectionFilter.disabled.indexOf(
                  CollectionFilterKey.evolutable
                ) > -1
              }
            />
          </Collapse.Panel>
          <Collapse.Panel
            header='수비배치여부'
            key={CollectionFilterKey.defense}
          >
            <CheckGroup
              optionList={optionLists.defense}
              onChangeCheckedList={(checkedList: CheckboxValueType[]) =>
                collectionStore.updateCollectionFilter(
                  CollectionFilterKey.defense,
                  checkedList
                )
              }
              checkedList={collectionFilter.defense}
              disabled={
                collectionFilter.disabled.indexOf(CollectionFilterKey.defense) >
                -1
              }
            />
          </Collapse.Panel>
        </Collapse>
      )}
    </FloatingDrawer>
  );
};

export default observer(FloatingFilterDrawer);
