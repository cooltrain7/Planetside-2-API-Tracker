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

//resort sanction-list
if( process.argv[2] === 'resort' )
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

//compile into machine list
else if( process.argv[2] === 'compile' )
{
	csv.writeToPath( 'sanction-list-machine.csv',
		rows
			.filter( r => r.Sanction !== 'none' && r.Sanction !== '' )
			.map( r => { delete r['Item Category']; delete r['Item Name']; return r; } )
			.sort( ( a, b ) => parseInt( a['Item ID'] ) - parseInt( b['Item ID'] ) ),
		{
			encoding: 'utf8',
			writeBOM: true,
			writeHeaders: false
		} );
}
