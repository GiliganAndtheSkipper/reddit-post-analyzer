import React from 'react';
import { saveAs } from 'filesaver.js';
import Papa from 'papaparse';
import useExportData from './hooks/useExportData';

const DataExport = () => {
    const { getDataForExport } = useExportData();

    const handleExportCSV = async () => {
        const data = await getDataForExport();
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'export-data.csv');
    };

    return (
        <div>
            <button onClick={handleExportCSV}>Export as CSV</button>
        </div>
    );
};

export default DataExport;