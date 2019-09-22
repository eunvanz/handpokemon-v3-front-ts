import React, { PureComponent } from 'react';
import { Card } from 'antd';
import ContentContainer from '../ContentContainer/index';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ContentContainer>
          <Card
            style={{
              width: 450,
              maxWidth: '100%',
              padding: 24,
              margin: 'auto'
            }}
          >
            <div className='text-center'>
              <h2>희귀한 오류 발견!</h2>
              <h3 className='c-primary'>{this.state.error.message}</h3>
              <div style={{ marginTop: 12 }}>
                반복될 경우 운영자에게 문의해주세요.
              </div>
            </div>
          </Card>
        </ContentContainer>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
