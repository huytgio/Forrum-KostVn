import React from 'react';
import { List, AutoSizer } from 'react-virtualized';

const MyVirtualizedList = ({ data }) => {
    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    width={width}
                    height={height}
                    rowCount={data.length}
                    rowHeight={50}
                    rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style}>
                            {data[index]}
                        </div>
                    )}
                />
            )}
        </AutoSizer>
    );
};

export default MyVirtualizedList;
