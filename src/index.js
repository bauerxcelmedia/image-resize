import querystring from 'querystring';

const imageResize = {

    quality: 75,

    mode: {
        CROP: 'crop',
        PAD: 'pad',
        MAX: 'max'
    },

    scale: {
        BOTH: 'both',
        UP: 'upscaleonly',
        DOWN: 'downscaleonly',
        UP_CANVAS: 'upscalecanvas'
    },

    anchor: {
        TL: 'topleft',    TC: 'topcenter',    TR: 'topright',
        ML: 'middleleft', MC: 'middlecenter', MR: 'middleright',
        BL: 'bottomleft', BC: 'bottomcenter', BR: 'bottomright'
    },

    url(props) {
        const d = { ...props };
        if (!d || !d.url) return '';
        if (!d.width && !d.height) return d.url;
        const url = d.url;
        delete d.url;
        if (!d.quality) d.quality = this.quality;
        return url + '?' + querystring.stringify(d);
    }

};

export default imageResize;
