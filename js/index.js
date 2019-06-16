const btnEncrypt = document.querySelector( '#btn-encrypt' );
const btnDecrypt = document.querySelector( '#btn-decrypt' );
const btnBruteForce = document.querySelector( '#btn-brute-force' )
const plainTextArea = document.querySelector( '#string' );
const encryptTextArea = document.querySelector('#encryptedString');
const shift = document.querySelector( '#shift' );
const alphabets = "abcdefghijklmnopqrstuvwxyz".split( '' );
const tbody = document.querySelector('tbody');

btnEncrypt.addEventListener( 'click', ( e ) => { 
    e.preventDefault();
    encryptTextArea.value = encrypt( plainTextArea.value.toLowerCase(), shift.value );
    plainTextArea.value = "";
    e.target.blur();
});

btnDecrypt.addEventListener( 'click', ( e ) => { 
    e.preventDefault();
    plainTextArea.value = decrypt( encryptTextArea.value, shift.value );
    encryptTextArea.value = "";
    e.target.blur();
});

btnBruteForce.addEventListener( 'click', ( e ) => {
    e.preventDefault();
    bruteForce( encryptTextArea.value );
    e.target.blur();
});

function shiftAlphabets( alphabets, shift ) {
    for ( i=1; i<=shift; i++ ) {
        alphabets.push( alphabets.shift() );
    }
}

function encrypt( string, shift ) {
    numStringArray = string.split( '' ).map( e => alphabets.indexOf( e ) != -1 ? alphabets.indexOf( e ) : e );

    shiftAlphabets( alphabets, shift );

    encryptedString = numStringArray.map( e => alphabets[e] ? alphabets[e] : e ).join( '' );

    alphabets.sort();
    
    return encryptedString;
}

function decrypt( string, shift ) {
    shiftAlphabets( alphabets, shift );

    numStringArray = string.split( '' ).map( e => alphabets.indexOf( e ) != -1 ? alphabets.indexOf( e ) : e );

    alphabets.sort();

    decryptedString = numStringArray.map( e => alphabets[e] ? alphabets[e] : e ).join( '' );
        
    return decryptedString;
     
}

function bruteForce( string ) {
    tbody.innerHTML = "";

    for( i=1; i<=25; i++ ) {
        const html = 
        `
        <tr class="tc striped--light-gray">
        <td class="pv2">${i}</td>
        <td class="pv2">${decrypt( string, i )}</td>
        </tr>
        `;
        i--;            
        tbody.insertAdjacentHTML('beforeend', html);
    }

}