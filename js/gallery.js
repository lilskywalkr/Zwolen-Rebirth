$(document).ready(function () {
    let lightboxId = 'lightbox'; // Lightbox id
    let galleryId = 'gallery'; // Image container id
    let imgDataId = 'data-img-id'; // Attribute for image unique id
    let imgDataAlt = 'data-img-alt'; // Attribute for large image source
    let lightboxSpd = 300; // Lightbox fading speed in ms

    let lightboxOpened = false;
    let images = [];
    $(`#${galleryId} img`).each(function (idx) {
        images.push($(this).attr('src'));
        $(this).attr(imgDataId, idx);
    });

    // Open lightbox
    $(document).on('click', `#${galleryId} .figure`, function () {
        lightboxOpen($(this).find('img'));
    });

    // Prev / Next buttons
    $(document).on('click', `#${lightboxId} .prev`, function () {
        let nextId = lightboxNextId(-1);
        lightboxOpen(lightboxImg(nextId));
    });
    $(document).on('click', `#${lightboxId} .next`, function () {
        let nextId = lightboxNextId(1);
        lightboxOpen(lightboxImg(nextId));
    });

    // Close by button or click off image
    $(document).on('click', `#${lightboxId} .close`, lightboxClose);
    $(document).on('click', `#${lightboxId}`, function (e) {
        if ($(e.target).is(`#${lightboxId}`)) lightboxClose();
    });

    // Keyboard [ ESC = Close, Left/Right arrows = Prev/Next image ]
    $(document).on('keyup', function (e) {
        if (e.keyCode == 27) {
            lightboxClose();
        } else if (e.keyCode == 37 || e.keyCode == 39) {
            if (lightboxOpened) {
                let nextId = lightboxNextId((e.keyCode == 37) ? -1 : 1);
                lightboxOpen(lightboxImg(nextId));
            }
        }
    });

    function lightboxNextId(dt) {
        let nextId = lightboxCurId() + dt;
        if (nextId < 0) nextId = images.length - 1;
        if (nextId >= images.length) nextId = 0;
        return nextId;
    }

    function lightboxCurId() {
        let lb = $(`#${lightboxId}`);
        if (lb.length) {
            return parseInt(lb.find('img').attr(imgDataId));
        } else {
            return -1;
        }
    }

    function lightboxImg(id) {
        if (id < 0 || id >= images.length) return NULL;
        return $(`#${galleryId} img[${imgDataId}='${id}']`);
    }

    function lightboxOpen(img) {
        if (!img) return;
        $('body').append(`
      <div id="${lightboxId}">
        <img src="" alt=""/>
        <span class="close">&times;</span>
        <span class="prev">&lt</span>
        <span class="next">&gt</span>
      </div>`);
        let lb = $(`#${lightboxId}`);
        lb.css('display', 'block').animate({
            opacity: 1
        }, lightboxSpd);
        let src = img.attr(imgDataAlt) ? img.attr(imgDataAlt) : img.attr('src');
        let slot = $(`#${lightboxId} img`);
        slot.attr(imgDataId, img.attr(imgDataId));
        slot.attr(imgDataAlt, img.attr(imgDataAlt));
        slot.attr('src', src);
        $(`#${galleryId}`).addClass('blur');
        lightboxOpened = true;
    }

    function lightboxClose() {
        let lb = $(`#${lightboxId}`);
        let gl = $(`#${galleryId}`);
        lb.animate({
            opacity: 0
        }, lightboxSpd, function () {
            lb.css('display', 'none').remove();
        });
        $(`#${galleryId}`).removeClass('blur');
        lightboxOpened = false;
    }

    {
        $('.bars span').click(function () {
            $('.dropdown-menu').slideToggle(600);
            $('.dropdown-menu').css('display', 'flex');
        });
    }
});
