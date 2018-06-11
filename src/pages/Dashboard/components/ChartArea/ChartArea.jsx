import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';
import { DatePicker } from "@icedesign/base";

const { MonthPicker, YearPicker, RangePicker } = DatePicker;
export default class ChartArea extends Component {
  static displayName = 'ChartArea';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      { year: '周一', north: 322, south: 162 },
      { year: '周二', north: 324, south: 90 },
      { year: '周三', north: 329, south: 50 },
      { year: '周四', north: 342, south: 77 },
      { year: '周五', north: 348, south: 35 },
      { year: '周六', north: 334, south: -45 },
      { year: '周日', north: 325, south: -88 },
      
    ];

    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['north', 'south'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });

    const cols = {
      year: {
        range: [0, 1],
      },
    };

    return (
      <div className="chart-area">
        <IceContainer>
          <h4 style={styles.title}>近一周的数据量分布</h4>
          <RangePicker defaultValue={["2017-02-14", "2017-03-24"]}  style={{float:'right',marginTop:-80}}/>
          <Chart height={300} data={dv} scale={cols} forceFit>
            <Axis name="year" />
            <Axis
              name="value"
              label={{
                formatter: (val) => {
                  return `${(val / 10000).toFixed(1)}k`;
                },
              }}
            />
            <Legend />
            <Tooltip crosshairs={{ type: 'line' }} />
            <Geom type="area" position="year*value" color="type" />
            <Geom type="line" position="year*value" size={2} color="type" />
          </Chart>
        </IceContainer>
        
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '15px',
    paddingBottom: '15px',
    fontWeight: 'bold',
  },
};
