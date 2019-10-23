import React, {
  useMemo,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { ICodeInstance } from '../../stores/models/code';
import ContentWrapper from '../../components/ContentWrapper/index';
import SpinContainer from '../../components/SpinContainer';
import { Card, Row, Col, Progress } from 'antd';
import {
  getDetailCdsInMasterCdGroup,
  getDetailCdNmByDetailCd,
} from '../../libs/codeUtils';
import { MASTER_CD } from '../../constants/codes';
import { GRADE_STYLE } from '../../constants/styles';
import CollectionList from '../../components/CollectionList';
import { observer } from 'mobx-react';
import AppContext from '../../contexts/AppContext';
import { useParams } from 'react-router';
import FloatingFilterDrawer from '../../components/FloatingFilterDrawer';
import { toJS } from 'mobx';
import { ICollection } from '../../stores/models/collectionModel';
import ConfirmModal from '../../components/ConfirmModal/index';
import history from '../../libs/history';
import MessageModal from '../../components/MessageModal/index';
import { MessageModalType } from '../../components/MessageModal/MessageModal';
import { CollectionModes } from '../../stores/collectionStore';

interface ICollectionStateSectionProps {
  codes: ICodeInstance[];
  monCounts: any[];
}

const CollectionStateSection = ({
  codes,
  monCounts,
}: ICollectionStateSectionProps) => {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Row gutter={6}>
        {getDetailCdsInMasterCdGroup(MASTER_CD.MON_GRADE, codes).map(
          (gradeCd: string) => (
            <Col
              xs={8}
              lg={4}
              className='text-center'
              style={{ margin: '6px 0' }}
              key={gradeCd}
            >
              <Progress
                type='circle'
                percent={
                  (monCounts.find(item => item.key === gradeCd).cnt * 100) /
                  monCounts.find(item => item.key === gradeCd).total
                }
                format={() =>
                  `${monCounts.find(item => item.key === gradeCd).cnt} / ${
                    monCounts.find(item => item.key === gradeCd).total
                  }`
                }
                strokeColor={GRADE_STYLE[gradeCd].backgroundColor}
                width={80}
                strokeWidth={4}
              />
              <h3 style={{ marginBottom: 0 }}>
                {getDetailCdNmByDetailCd(gradeCd, codes)}
              </h3>
            </Col>
          )
        )}
      </Row>
    </Card>
  );
};

export interface ISelectConfigs {
  message: ReactNode;
  onSelect: (targetCol: ICollection) => void;
  onCancel: () => void;
}

const CollectionView = () => {
  const { userStore, codeStore, collectionStore } = useContext(AppContext);
  const { id } = useParams();

  const user = useMemo(() => {
    // if (id === 'user') return userStore.user
    return userStore.user;
  }, [userStore.user]);

  const { codes } = codeStore;
  const {
    mons,
    collections,
    cancelMix,
    mixCollections,
    mode,
  } = collectionStore;
  const { filteredList } = collectionStore;

  const [selectConfigs, setSelectConfigs] = useState<ISelectConfigs>();
  const [proceeding, setProceeding] = useState(false);

  const selectable = useMemo(() => {
    return mode === CollectionModes.mix;
  }, [mode]);

  const monCounts = useMemo(() => {
    if (collections && mons && codes) {
      const result: { total: number; cnt: number; key: string }[] = [];
      (codeStore.findDetailCdsInMasterCdGroup(
        MASTER_CD.MON_GRADE
      ) as string[]).forEach((gradeCd: string) => {
        const item = { total: 0, cnt: 0, key: gradeCd };
        item.cnt = collections.filter(
          item => item.mon.gradeCd === gradeCd
        ).length;
        item.total = mons.filter(item => item.gradeCd === gradeCd).length;
        result.push(item);
      });
      return result;
    } else {
      return null;
    }
  }, [mons, codeStore, codes, collections]);

  useEffect(() => {
    if (id === 'user' && user && user.collections) {
      collectionStore.setCollections(toJS(user.collections));
    }
  }, [id, user, collectionStore]);

  const isLoading = !codes || !collections || !monCounts;

  const handleOnClickMix = useCallback(
    (col: ICollection) => {
      setSelectConfigs({
        message: (
          <div>
            <span className='c-primary fw-700'>{col.mon.name}</span>와(과)
            교배할 포켓몬을 선택해주세요.
          </div>
        ),
        onSelect: targetCol => {
          const proceed = () => {
            ConfirmModal({
              title: (
                <div>
                  <span className='c-primary fw-700'>{col.mon.name}</span>
                  와(과){' '}
                  <span className='c-primary fw-700'>{targetCol.mon.name}</span>
                  을(를) 교배하시겠습니까?
                </div>
              ),
              content:
                '교배하는 포켓몬의 레벨이 1 하락하고, 레벨 1의 포켓몬의 경우 영원히 사라집니다.',
              onOk: async () => {
                setProceeding(true);
                await mixCollections([col.id, targetCol.id]);
                history.replace('/pick');
              },
            });
          };
          const colBook =
            user &&
            user.books &&
            user.books.find(item => item.colId === targetCol.id);
          if (colBook) {
            if (targetCol.level === 1) {
              MessageModal({
                type: MessageModalType.error,
                title: '교배 불가',
                content:
                  '도감에 등록되어있는 포켓몬입니다. 도감에서 제외하거나 다음 레벨에서 교배해주세요!',
              });
            } else {
              ConfirmModal({
                title: '도감에 등록된 포켓몬',
                content:
                  '도감에 등록되어있는 포켓몬입니다. 교배하게 되면 도감보너스가 하락합니다. 그래도 교배하시겠습니까?',
                onOk: () => {
                  proceed();
                },
              });
            }
          } else {
            proceed();
          }
        },
        onCancel: () => {
          cancelMix();
        },
      });
    },
    [mixCollections, user, cancelMix]
  );

  return (
    <ContentWrapper>
      {isLoading && <SpinContainer />}
      {collections && monCounts && codes && !selectable && (
        <CollectionStateSection codes={codes} monCounts={monCounts} />
      )}
      {codes && filteredList && user && (
        <CollectionList
          selectable={selectable}
          selectConfigs={selectConfigs}
          list={filteredList}
          codes={codes}
          user={user}
          onClickMix={handleOnClickMix}
          proceeding={proceeding}
        />
      )}
      <FloatingFilterDrawer />
    </ContentWrapper>
  );
};

export default observer(CollectionView);
