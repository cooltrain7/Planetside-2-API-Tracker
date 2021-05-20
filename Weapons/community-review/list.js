import csv from 'fast-csv';

//load headers, rows
const { headers, rows } = await new Promise( resolve =>
	{
		const headers = [];
		const rows = [];
		csv.parseFile( 'sanction-list.csv',
			{
				encoding: 'utf8',
				headers: true,
				strictColumnHandling: true,
				trim: true
			} )
			.on( 'headers', h => headers.push( ... h ) )
			.on( 'data', d => rows.push( d ) )
			.on( 'data-invalid', e => { throw e; } )
			.on( 'end', () => resolve( { headers, rows } ) );
	} );

//sort sanction-list
if( process.argv[2] === 'sort' || process.argv[2] === 'sort-compile' )
{
	rows.sort( ( a, b ) =>
		{
			if( a['Item Category'] !== b['Item Category'] )
				return a['Item Category'].localeCompare( b['Item Category'] );
			if( a.Sanction !== b.Sanction )
				return a.Sanction.localeCompare( b.Sanction );
			if( a['Item Name'] !== b['Item Name'] )
				return a['Item Name'].localeCompare( b['Item Name'] );
			return parseInt( a['Item ID'] ) - parseInt( b['Item ID'] );
		} );
	csv.writeToPath( 'sanction-list.csv', rows,
		{
			alwaysWriteHeaders: true,
			encoding: 'utf8',
			headers,
			writeBOM: true
		} );
}

//compile into machine lists
if( process.argv[2] === 'compile' || process.argv[2] === 'sort-compile' )
{
	//map rows into machine based rows
	//(have to copy into new objects so race condition doesn't change regular rows before they are written)
	const rows_machine = rows
		.filter( r => r.Sanction !== '' )
		.map( r => { return { ['Item ID']: r['Item ID'], Sanction: r.Sanction }; } )
		.sort( ( a, b ) => parseInt( a['Item ID'] ) - parseInt( b['Item ID'] ) );

	csv.writeToPath( 'sanction-list-machine.csv', rows_machine.filter( r => r.Sanction !== 'none' ),
		{
			encoding: 'utf8',
			writeBOM: true,
			writeHeaders: false
		} );
	csv.writeToPath( 'sanction-list-machine-with-none.csv', rows_machine,
		{
			encoding: 'utf8',
			writeBOM: true,
			writeHeaders: false
		} );
}
