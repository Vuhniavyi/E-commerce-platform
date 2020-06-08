import React, { Component, Fragment } from 'react';
import styles from './ContractorProducts.module.css';
// import {Icon} from 'antd';
// import moment from 'moment';
import { Link } from 'react-router-dom';
import { getDownloadsStatus } from '../../../actions/productsActions';
// import progres from '../../../img/progress.gif';
import TableTemplate from '../Finance/TableTemplate';
import Icons from '../components/Icons/Icons';


// import SimpleTable from "../components/Table/SimpleTable";
class DownloadHistory extends Component {
  state = {
    files: []
  };

  interval = '';

  async componentDidMount() {
    // this.props.history.replace(/products/, "")
    // getDownloadsStatus().then(res => {
    //   this.setState(
    //     {
    //       files: res
    //     });
    // });

    // this.interval = setInterval(() => {
    //     getDownloadsStatus()
    //         .then(res => {
    //             this.setState({
    //                 files: res
    //             })
    //         })
    // }, 15000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { files } = this.state;
    console.log('files', files)

    return (
      <Fragment>
        <div className={styles.top}>
          <h3 className={styles.title}>
            <Link to="/admin/products" className={styles.link}>
              Мои товары
            </Link>
            <Icons variants="default" icon="double_arrow" />
            История загрузок
          </h3>
        </div>

        <TableTemplate
          // dataSource={files}
          willHaveFullData={true}
          actions="productsActions"
          action="getDownloadsStatus"
          moduleName="contractorProducts"
          tableName="uploadsHistory"
          units="загрузок"
          user={{ role: 'CONTRACTOR' }}
        />

        {/* <div className={styles.historyPage}>
                    {files.map((item, index) => (
                        <div key={index} className={styles.fileBlock}>
                            <span className={styles.fileName}>
                               <a href={item.xlsFile}>
                                   {item.xlsFile.split('/')[item.xlsFile.split('/').length - 1]}
                               </a>

                                {item.totalProductsCount ? <span className={styles.errorsBlock}>
                               Загружено {item.totalProductsCount} товаров
                            </span> : ''}
                                <span className={styles.errorsBlock}>
                                {item.errors === 'No errors' ? '' : item.errors}
                            </span>
                            </span>
                            <span className={styles.date}>
                                {moment(item.created).format('DD-MM-YYYY HH:mm')}
                            </span>

                            <span className={styles.status}>
                                 {(item.isUploaded || item.errors || item.errors === 'No errors') ?
                                     <Icon type="check" className={styles.icon}/> : <img src={progres} alt=""/>}
                            </span>
                        </div>
                    ))}
                </div> */}
      </Fragment>
    );
  }
}

export default DownloadHistory;
