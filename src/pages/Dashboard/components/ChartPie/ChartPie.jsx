import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class ChartPie extends Component {
  static displayName = 'ChartPie';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      { item: '20K~40K', count: 40 },
      { item: '40K~60K', count: 21 },
      { item: '60K~80K', count: 17 },
      { item: '80K~100K', count: 13 },
      { item: '200K~', count: 9 },
    ];

    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };

    return (
      <div className="chart-pie">
        <IceContainer>
          <h4 style={styles.title}>工资水平分布（月）</h4>
          <Chart
            height={400}
            data={dv}
            scale={cols}
            padding={[80, 100, 80, 80]}
            forceFit
          >
            <Coord type="theta" radius={0.75} />
            <Axis name="percent" />
            <Legend position="right" offsetY={-200} offsetX={0} />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                'item*percent',
                (item, percent) => {
                  percent = `${percent * 100}%`;
                  return {
                    name: item,
                    value: percent,
                  };
                },
              ]}
              style={{ lineWidth: 1, stroke: '#fff' }}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return `${item.point.item}: ${val}`;
                }}
              />
            </Geom>
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
