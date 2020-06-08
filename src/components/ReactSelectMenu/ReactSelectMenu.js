import React from 'react';
import { FixedSizeList as List } from "react-window";

import styles from './ReactSelectMenu.module.css';

const ITEM_HEIGHT = 50;

const calculateMaxHeight = (length, maxHeight) => {
  const currentHeight = length * ITEM_HEIGHT;

  return currentHeight >= maxHeight ? maxHeight : currentHeight;
}

export default class MenuList extends React.PureComponent {
  render() {
    const { options, children, maxHeight, getValue, isLoading } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * ITEM_HEIGHT;

    if (isLoading) {
      return <div className={styles.dropDown}>Loading</div>
    }

    if (options.length === 0) {
      return <div className={styles.dropDown}>No matches</div>
    }

    const newMaxHeight = calculateMaxHeight(options.length, maxHeight);

    return (
      <List
        height={newMaxHeight}
        itemCount={children.length}
        itemSize={ITEM_HEIGHT}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}
