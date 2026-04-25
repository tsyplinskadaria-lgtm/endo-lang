(() => {
    "use strict";
    document.querySelectorAll("[data-video]").forEach((item => {
        const id = item.dataset.video;
        const preview = item.querySelector(".video__preview");
        preview.style.backgroundImage = `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)`;
        item.addEventListener("click", (function() {
            this.innerHTML = `\n      <iframe \n        src="https://www.youtube.com/embed/${id}?autoplay=1"\n        frameborder="0"\n        allow="autoplay; encrypted-media"\n        allowfullscreen>\n      </iframe>\n    `;
        }));
    }));
    document.querySelectorAll(".choose-center .tabs").forEach((tabs => {
        const controls = tabs.querySelectorAll("[data-tabs-control]");
        const items = tabs.querySelectorAll(".center");
        controls.forEach((control => {
            control.addEventListener("click", (() => {
                const target = control.dataset.tabsControl;
                controls.forEach((c => c.classList.remove("tabs__control-active")));
                control.classList.add("tabs__control-active");
                items.forEach((item => {
                    const bank = item.dataset.bank;
                    const show = target === "all" || bank === target;
                    item.style.display = show ? "flex" : "none";
                }));
            }));
        }));
    }));
    document.querySelectorAll("[data-tabs]").forEach((tabs => {
        const controls = tabs.querySelectorAll(".tabs__control");
        const items = tabs.querySelectorAll(".tabs__panes > [data-tabs-control]");
        function setActive(target) {
            controls.forEach((btn => {
                btn.classList.toggle("tabs__control-active", btn.dataset.tabsControl === target);
            }));
            items.forEach((item => {
                item.classList.toggle("active", item.dataset.tabsControl === target);
            }));
        }
        const activeBtn = tabs.querySelector(".tabs__control.tabs__control-active");
        if (activeBtn) setActive(activeBtn.dataset.tabsControl);
        controls.forEach((btn => {
            btn.addEventListener("click", (() => {
                setActive(btn.dataset.tabsControl);
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const sliderEl = document.querySelector(".result__swiper");
        const nextBtn = document.querySelector(".result__arrow--next");
        const prevBtn = document.querySelector(".result__arrow--prev");
        new Swiper(sliderEl, {
            loop: false,
            speed: 600,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            }
        });
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const isMobile = window.matchMedia("(max-width: 576px)").matches;
        const collapsedHeight = isMobile ? 75 : 90;
        const buttons = document.querySelectorAll(".response-slide__toggle");
        buttons.forEach((btn => {
            const slide = btn.closest(".response-slide");
            const text = slide.querySelector(".response-slide__text");
            if (text.scrollHeight <= collapsedHeight) {
                btn.style.display = "none";
                return;
            }
            text.style.maxHeight = collapsedHeight + "px";
            btn.addEventListener("click", (function() {
                const isOpen = slide.classList.contains("open");
                if (isOpen) {
                    slide.classList.remove("open");
                    this.textContent = "Читати далі";
                    text.style.maxHeight = collapsedHeight + "px";
                } else {
                    slide.classList.add("open");
                    this.textContent = "Згорнути";
                    text.style.maxHeight = text.scrollHeight + "px";
                }
            }));
        }));
    }));
    new Swiper(".response__slider", {
        loop: false,
        spaceBetween: 16,
        speed: 600,
        navigation: {
            nextEl: ".response__arrow--next",
            prevEl: ".response__arrow--prev"
        },
        breakpoints: {
            0: {
                slidesPerView: "auto",
                spaceBetween: 10
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 16
            }
        }
    });
    document.addEventListener("DOMContentLoaded", (() => {
        const modals = document.querySelectorAll(".modal, .modal-promo");
        const openBtns = document.querySelectorAll(".open-modal, .open-modal-promo");
        openBtns.forEach((btn => {
            btn.addEventListener("click", (() => {
                const targetClass = btn.classList.contains("open-modal-promo") ? ".modal-promo" : ".modal";
                const modal = document.querySelector(targetClass);
                if (modal) modal.classList.add("active");
            }));
        }));
        modals.forEach((modal => {
            const closeBtn = modal.querySelector(".modal__close");
            const overlay = modal.querySelector(".modal__overlay");
            const closeModal = () => modal.classList.remove("active");
            closeBtn?.addEventListener("click", closeModal);
            overlay?.addEventListener("click", closeModal);
        }));
        const selects = document.querySelectorAll("[data-select]");
        selects.forEach((select => {
            const head = select.querySelector(".select__head");
            const items = select.querySelectorAll(".select__item");
            const realSelect = select.querySelector(".select__real");
            if (!head || !items.length || !realSelect) return;
            head.addEventListener("click", (e => {
                e.stopPropagation();
                selects.forEach((item => {
                    if (item !== select) item.classList.remove("active");
                }));
                select.classList.toggle("active");
            }));
            items.forEach((item => {
                item.addEventListener("click", (e => {
                    e.stopPropagation();
                    const value = item.dataset.value;
                    items.forEach((i => i.classList.remove("active")));
                    item.classList.add("active");
                    head.innerHTML = item.innerHTML;
                    realSelect.value = value;
                    realSelect.dispatchEvent(new Event("change", {
                        bubbles: true
                    }));
                    select.classList.remove("active");
                }));
            }));
        }));
        document.addEventListener("click", (() => {
            selects.forEach((select => {
                select.classList.remove("active");
            }));
        }));
    }));
    window["FLS"] = true;
})();