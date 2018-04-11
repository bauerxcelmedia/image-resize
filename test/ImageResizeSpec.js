import imageResize from '../src/index';
import { expect, should } from 'chai';

should();

const imageUrl = 'http://url/img.jpg';

describe('Resize helper core guard', function () {

    it('should return an empty string if no url is given', function() {
        expect(imageResize.url()).to.be.empty;
    });

    it('should return the same url if no width or height is given', function() {
        expect(imageResize.url({url:imageUrl})).to.equal(imageUrl);
    });

});

describe('Resize helper returns a url that', function(){

    it('should have a width parameter and no height parameter, if there is no height parameter given', function() {
        const resizeUrl = imageResize.url({url:imageUrl, width:100});
        resizeUrl.should.contain('width=100');
        resizeUrl.should.not.contain('height=');
    });

    it('should have a height parameter and no width parameter, if there is no width parameter given', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100});
        resizeUrl.should.contain('height=100');
        resizeUrl.should.not.contain('width=');
    });

    it('should have a anchor parameter if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, anchor:imageResize.anchor.TC});
        resizeUrl.should.contain('&anchor=topcenter');
    });

    it('should have an mode of crop parameter if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, mode:imageResize.mode.CROP});
        resizeUrl.should.contain('&mode=crop');
    });

    it('should have a mode parameter of pad if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, mode:imageResize.mode.PAD});
        resizeUrl.should.contain('&mode=pad');
    });

    it('should have a scale parameter of both if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, scale:imageResize.scale.BOTH});
        resizeUrl.should.contain('&scale=both');
    });

    it('should have a scale parameter of upscaleonly if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, scale:imageResize.scale.UP});
        resizeUrl.should.contain('&scale=upscaleonly');
    });

    it('should have a scale parameter of downscaleonly if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, scale:imageResize.scale.DOWN});
        resizeUrl.should.contain('&scale=downscaleonly');
    });

    it('should have a scale parameter of upscalecanvas if one is provided', function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, scale:imageResize.scale.UP_CANVAS});
        resizeUrl.should.contain('&scale=upscalecanvas');
    });

    it('should have a default quality parameter of ' + imageResize.quality, function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100});
        resizeUrl.should.contain('&quality='+imageResize.quality);
    });

    const testOverideDefaultQuality = 99;
    imageResize.quality = testOverideDefaultQuality;
    it('should have a default quality parameter of ' + testOverideDefaultQuality, function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100});
        resizeUrl.should.contain('&quality='+testOverideDefaultQuality);
    });

    const testQuality = 33;
    it('should have a quality parameter of ' + testQuality , function() {
        const resizeUrl = imageResize.url({url:imageUrl, height:100, quality:testQuality});
        resizeUrl.should.contain('&quality='+testQuality);
    });

});
