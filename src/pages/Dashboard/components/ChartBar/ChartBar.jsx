import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import axios from 'axios'
export default class ChartBar extends Component {
  static displayName = 'ChartBar';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      col: [],
    };
  }
  getData = () => {
    axios
      .get("api/PersonnelMS/department_getNames")
      .then((res) => {
        console.log("resss", res.data.content)
        console.log("resss2", res.data.content.col)
        console.log("resss3", res.data.content.res)
        const dataSource = res.data.content.res
        const names = res.data.content.col.names
        this.setState({
          dataSource: dataSource,
          col: names
        })
      })
  }

  componentWillMount() {
    this.getData()
  }

  render() {
    const { dataSource, col } = this.state
    const data = [
      dataSource
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: col, // 展开字段集
      key: '部门', // key字段
      value: '部门人数', // value字段
    });

    return (
      <div className="chart-bar">
        <IceContainer>
          <h4 style={styles.title}>员工分布</h4>
          <Chart height={400} data={dv} forceFit>
            <Axis name="部门" />
            <Axis name="部门人数" />
            <Legend />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position="部门*部门人数"
              color="#3898ff"
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
            />
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
