import { v4 as uuidv4 } from 'uuid';

export default function Table({tbodyData, highlightedRow, setHighlightedRow}) {
    // select the table row 
    const ClickHighlight = (e,index) => {
        // check if (set)highlightedRow passed
        if (highlightedRow && setHighlightedRow) {
            // if already highlighted remove else set
            if (highlightedRow === index) {
                setHighlightedRow(-99);
            } else {
                setHighlightedRow(index);
            }
        };
    };

    //console.log('UUID =',uuidv4());

    // define function to the get keys from json data
    const getHeadings = (json) => {
        return Object.keys(json[0]);
    };

    // get an array of keys for the table header
    const theadData = getHeadings(tbodyData);

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: 'auto',
        maxheight: '100px',
        overflow: 'scroll'
    };

    return (
        <div style={myComponent}>
            <table>
                <thead>
                    <tr>
                    {theadData.map((heading, column) => {
                        return <th key={column}>{heading}</th>
                    })}
                    </tr>
                </thead>
                <tbody>
                    {tbodyData.map((rowdata, index) => {
                        return <tr key={uuidv4()} onMouseDown={(e) => ClickHighlight(e,index)} 
                            style={ (index === highlightedRow) ? { backgroundColor: 'cyan' } : {}}
                        >
                            {theadData.map((heading, column) => {
                                return <td key={uuidv4()}>{rowdata[heading]}</td>
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
}