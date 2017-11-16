var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');



describe('generateMessage', ()=>{

    it('Should generate correct message object', ()=>{
        var from= 'Admin';
        var text= 'Text Message';

        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });

    });

});

describe('generateLocationMessage', ()=>{
    
        it('Should generate correct location object', ()=>{
            var from= 'Hero';
            var latitude = 15;
            var longitude = 19;
            var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
            var message = generateLocationMessage(from, latitude, longitude);
    
            expect(message.createdAt).toBeA('number');
            expect(message).toInclude({ from, url });
    
        });
    
    });