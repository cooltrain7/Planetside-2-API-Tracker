import csv from 'fast-csv';
import fs from 'fs';

const filename = 'size-list';

//load headers, rows
const { headers, rows } = await new Promise( resolve =>
	{
		const headers = [];
		const rows = [];
		csv.parseFile( filename + '.csv',
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
			if( a.item_name !== b.item_name )
				return a.item_name.localeCompare( b.item_name );
			return parseInt( a.faction_id ) - parseInt( b.faction_id );
		} );
	csv.writeToPath( filename + '.csv', rows,
		{
			WriteHeaders: true,
			encoding: 'utf8',
			headers: ['item_id', 'item_name', 'size', 'faction_id', 'experience_id'],
			writeBOM: true
		} );
}

//compile into machine lists
if( process.argv[2] === 'compile' || process.argv[2] === 'sort-compile' )
{
    //map rows into machine based rows
	//(have to copy into new objects so race condition doesn't change regular rows before they are written)
	const rows_machine = rows
        .map( r => {
			const obj = {};
			for (const h of headers) {
				obj[h] = r[h];
			}
			return obj;
		})
        .sort( ( a, b ) => {
            if( a.item_name !== b.item_name )
				return a.item_name.localeCompare( b.item_name );
			return parseInt( a.faction_id ) - parseInt( b.faction_id );
        });

    fs.writeFileSync( filename + '.json', JSON.stringify( rows_machine.reduce((items, item, index) => {
		const item_id = item.item_id
		delete item.item_id;
		items[item_id] = item;
		return items;
	}, {}) ), { encoding: 'utf8' } );
}