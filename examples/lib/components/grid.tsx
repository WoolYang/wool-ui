import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Row, Col } from '../../../src/components/index';

export class GridDemo extends React.Component {
    render() {
        const style = {
            height: '30px',
            lineHeight: '30px',
            backgroundColor: 'rgba(0,160,233,.7)',
            color: 'white',
            textAlign: 'center'
        }

        return (
            <div>
                <Row gutter={8} style={{ marginBottom: '10px' }} >
                    <Col span={8}><div style={style}>col-8</div></Col>
                    <Col span={8}><div style={style}>col-8</div></Col>
                    <Col span={8}><div style={style} >col-8</div></Col>
                </Row>
                <Row gutter={8} style={{ marginBottom: '10px' }}>
                    <Col span={8}><div style={style}>col-8</div></Col>
                    <Col span={8}><div style={style}>col-8</div></Col>
                    <Col span={8}><div style={style} >col-8</div></Col>
                </Row>
                <Row gutter={8} style={{ marginBottom: '10px' }}>
                    <Col span={8}><div style={style}>col-8</div></Col>
                    <Col span={8} offset={3}><div style={style} >col-offset-3</div></Col>
                </Row>
                <Row gutter={8} style={{ marginBottom: '10px' }}>
                    <Col span={18} push={6}><div style={style}>col-18 col-push-6</div></Col>
                    <Col span={6} pull={18}><div style={style} >col-6 col-pull-18</div></Col>
                </Row>
                <Row gutter={8} style={{ marginBottom: '10px' }}>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10}><div style={style}>col</div></Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={4}><div style={style}>col</div></Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10}><div style={style}>col</div></Col>
                </Row>
            </div>
        )
    }
}