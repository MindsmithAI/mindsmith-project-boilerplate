
export const ConvertTableToMarkDown = (rows: { value: string }[][]) => {
    if (rows.length === 0) return ''
  
    const headerRow = rows[0].map(header => header.value).join(' | ')
    const separatorRow = rows[0].map(() => '---').join(' | ')
    const dataRows = rows
      .slice(1) // Skip the header row
      .map(row => row.map(cell => cell.value).join(' | '))
      .join('\n')
  
    return `| ${headerRow} |\n| ${separatorRow} |\n${dataRows
      .split('\n')
      .map(row => `| ${row} |`)
      .join('\n')}`
};

export const ConvertMarkDownToTable = (tableMarkdown: string) => {
    const lines = tableMarkdown.split('\n')
    const dataRows = lines.map((row, index) => {
      if (index === 1) return null // Skip the second line
      const values = row.split('|').map(value => ({ value: value})).filter(value => value.value)
      return values
    }).filter(row => row !== null)
    return dataRows
};

export const sampleTable = "|Name|Age|Occupation|Country|\n" +
                           "|--------------|---------|-------------------|-----------------|\n" +
                           "|Alice|25|Software Engineer|United States|\n" +
                           "|Bob|30|Data Scientist|Canada|\n" +
                           "|Charlie|35|Teacher|United Kingdom|\n" +
                           "|Diana|28|Designer|Australia|"
