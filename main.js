const imagePaths = [];

for (let key in imageData) {
    if (imageData.hasOwnProperty(key)) {
        imagePaths.push(imageData[key]);
    }
  }
// imgElement.src = "data:image/png;base64," + imageData;
// console.log(imgElement);
let currentImageIndex = 0;
let currentClickedImage = '';
//    console.log(currentClickedImage);
   
(function(t) {
    var e = {};

    function i(s) {
        if (e[s]) {
            return e[s].exports
        }
        var n = e[s] = {
            i: s,
            l: false,
            exports: {}
        };
        t[s].call(n.exports, n, n.exports, i);
        n.l = true;
        return n.exports
    }
    i.m = t;
    i.c = e;
    i.d = function(t, e, s) {
        if (!i.o(t, e)) {
            Object.defineProperty(t, e, {
                enumerable: true,
                get: s
            })
        }
    };
    i.r = function(t) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: true
        })
    };
    i.t = function(t, e) {
        if (e & 1) t = i(t);
        if (e & 8) return t;
        if (e & 4 && typeof t === "object" && t && t.__esModule) return t;
        var s = Object.create(null);
        i.r(s);
        Object.defineProperty(s, "default", {
            enumerable: true,
            value: t
        });
        if (e & 2 && typeof t != "string")
            for (var n in t) i.d(s, n, function(e) {
                return t[e]
            }.bind(null, n));
        return s
    };
    i.n = function(t) {
        var e = t && t.__esModule ? function e() {
            return t["default"]
        } : function e() {
            return t
        };
        i.d(e, "a", e);
        return e
    };
    i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    };
    i.p = "";
    return i(i.s = 1)
})([function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.findStyle = e.toPromise = e.interceptEvent = e.transferChildren = e.getSeed = e.formatDateTime = e.formatTime = e.formatNumber = e.clearChildren = e.getImageDimensions = e.getUrl = e.round = e.styleSpaceMatcher = e.trimmableMatcher = e.spaceMatcher = e.CDATA_END = e.NS_XHTML = e.NS_SVG = void 0;
    e.NS_SVG = "http://www.w3.org/2000/svg";
    e.NS_XHTML = "http://www.w3.org/1999/xhtml";
    e.CDATA_END = String.fromCharCode(93, 93, 62);
    e.spaceMatcher = /^\s*$/;
    e.trimmableMatcher = /^\s+|\s+$/g;
    e.styleSpaceMatcher = /(?<=^|\W)\s+|\s+(?![\w\.\[\:\*#])/g;

    function s(t, e = 0) {
        e = 10 ** e;
        return Math.round((t + Number.EPSILON) * e) / e
    }
    e.round = s;

    function n(t) {
        return new Promise((e, i) => {
            const s = new FileReader;
            s.readAsDataURL(t);
            s.addEventListener("loadend", () => e(s.result));
            s.addEventListener("error", () => i(new Error("Unable to get URL from blob.")))
        })
    }
    e.getUrl = n;

    function r(t) {
        return new Promise((e, i) => {
            const s = new Image;
            s.src = t;
            s.addEventListener("load", () => e({
                width: s.naturalWidth,
                height: s.naturalHeight
            }));
            s.addEventListener("error", () => i(new Error("Could not load image from src.")))
        })
    }
    e.getImageDimensions = r;

    function o(t) {
        t.textContent = "";
        while (t.hasChildNodes()) t.removeChild(t.firstChild)
    }
    e.clearChildren = o;

    function h(t, e) {
        return t.toString(10).padStart(e, "0")
    }
    e.formatNumber = h;

    function a(t) {
        const e = Math.abs(t);
        let i = `${h(Math.floor(e/6e4%60),2)}:${h(Math.floor(e/1e3%60),2)}`;
        if (t < 36e5) return (t < 0 ? "-" : "") + i;
        i = `${h(Math.floor(e/36e5%24),2)}:${i}`;
        if (t < 864e5) return (t < 0 ? "-" : "") + i;
        return `${h(Math.floor(t/864e5),2)}d ${i}`
    }
    e.formatTime = a;

    function l(t = new Date) {
        const e = t.getFullYear();
        const i = t.getMonth();
        const s = t.getDate();
        const n = t.getHours();
        const r = t.getMinutes();
        const o = t.getSeconds();
        return `${h(s,2)}/${h(i+1,2)}/${h(e,4)} ${h(n%12||12,2)}:${h(r,2)}:${h(o,2)} ${n>=12?"PM":"AM"}`
    }
    e.formatDateTime = l;

    function c(t) {
        switch (typeof t) {
            case "undefined":
            case "object":
                if (t == null) t = "";
            default:
                t = t.toString();
            case "string": {
                let e = 0;
                for (let i = 0; i < t.length; i++) e = Math.imul(31, e) + t.charCodeAt(i) | 0;
                t = e
            }
        }
        return t
    }
    e.getSeed = c;

    function u(t, e) {
        if (!t.childElementCount) return;
        const i = t.ownerDocument.createDocumentFragment();
        Array.from(t.childNodes).forEach(i.appendChild, i);
        e.appendChild(i)
    }
    e.transferChildren = u;

    function d(t) {
        if (t.cancelable && !t.defaultPrevented) t.preventDefault();
        t.stopPropagation()
    }
    e.interceptEvent = d;

    function m(t, e, ...i) {
        return new Promise(s => e.call(t, ...i, s))
    }
    e.toPromise = m;

    function f(t, i = window.document) {
        var s;
        const n = i.querySelectorAll("style");
        let r;
        for (let e = n.length - 1; e >= 0; e--) {
            const {
                sheet: i
            } = n[e];
            if (!i) continue;
            if (!r) r = i;
            for (let e = i.rules.length - 1; e >= 0; e--) {
                const s = i.rules[e];
                if (s.type !== CSSRule.STYLE_RULE) continue;
                for (const e of s.selectorText.split(","))
                    if (e.trim() === t) return s
            }
        }
        if (!r) {
            const t = (s = i.ownerDocument) !== null && s !== void 0 ? s : i;
            r = (t.documentElement instanceof SVGElement ? t.appendChild(t.createElementNS(e.NS_SVG, "style")) : t.head.appendChild(t.createElement("style"))).sheet
        }
        const o = r.insertRule(`${t} {}`, r.rules.length - 1);
        return r.cssRules[o]
    }
    e.findStyle = f
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.MainHandler = void 0;
    
    const s = i(2);
    const n = i(3);
    const r = i(0);
    const o = i(4);
    const h = i(5);
    const a = i(6);
    const l = /^p-(\d+)-(\d+)/;
    
    class c {
        constructor(t = document) {

            var e, i, s;
            this.width = 1;
            this.height = 1;
            this.baseTime = 0;
            this.theshold = 3;
            this.time = 0;
            this._xc = 2;
            this._yc = 2;
            (e = t.querySelector(".noscript")) === null || e === void 0 ? void 0 : e.classList.remove("noscript");
            this.root = t.querySelector("svg");
            a.registerDropZone(this.root);
            this.document = t instanceof Document ? t : this.root.ownerDocument;
            this.masksElement = t.querySelector("g#ms");
            this.uiScaleRule = r.findStyle(".ui>*", t);
            this.pathGroup = t.querySelector("g#ps");
            this.instanceGroup = t.querySelector("g#ins");
            this.timeDisp = t.querySelector("text#time");
            this.dataElement = t.querySelector("script#data");
            this.menuGroup = t.querySelector("#menu");
            this.menuForm = t.querySelector("form#menuform");
            this.menuForm.addEventListener("submit", this.onMenuSubmit.bind(this));
            this.menuForm.addEventListener("reset", this.onMenuReset.bind(this));
            this.root.addEventListener("paste", this.onPaste.bind(this), true);
            // a.registerDropZone(this.root.querySelector("#menu"), this.onDragDrop.bind(this));

            this.imageSelector = this.menuForm.querySelector("input#image-input");
            this.imageSelector.addEventListener("change", this.onImageSelected.bind(this));

            this.updateImage("")
            let _this=this
            document.getElementById("RefreshAct").addEventListener("click",function(){
                _this.updateImage("")
            });
            document.getElementById("ResetImage").addEventListener("click",function(){

                    let elmnt = document.getElementById("finalImage")
                        let elmntHide = document.querySelector("#ins");
                        let elmntHide2 = document.querySelectorAll(".hideit");
                        
                        let temp = [];
                        
                        for (let i = 0; i < elmntHide.children.length; i++) {
                            if(elmntHide.children[i]!=elmnt){
                                temp.push(elmntHide.children[i]) 
                            }
                        }
                        
                        elmnt.parentNode.appendChild(elmnt)

                        anime({
                            targets: [elmntHide2,temp],
                            opacity:[0,1],
                            duration: 500,
                            delay:500,
                            easing: 'easeInOutQuad',
                        });
                        anime({
                            targets: elmnt,
                            opacity:[1,0],
                            duration:1000,
                            delay:500,
                            easing: 'easeInOutQuad',
                        });
                        anime({
                            targets: elmnt,
                            scale: 1,
                            translateX: "0",
                            duration: 500,
                            delay:500,
                            easing: 'easeInOutQuad',
                        });
                        anime({
                            targets: "#footer",
                            y: "450",
                            duration: 1000,
                            delay:500,
                            easing: 'easeInOutQuad',
                            complete:function(){
                                // document.querySelector("#Optionimage image")[0].click();
                                _this.updateImage("")
                            }
                        });

            });
            
            // openFullscreen()
            this.document.getElementById("MaxMinScreen").addEventListener("click",function (){
                if(this.getAttribute("who")=="Min"){
                    openFullscreen();
                    document.getElementById("MaxIco").style.display="none";
                    document.getElementById("MinIco").style.display="block";
                    this.setAttribute("who","Max")
                }else{
                    exitFullscreen();
                    document.getElementById("MaxIco").style.display="block";
                    document.getElementById("MinIco").style.display="none";
                    this.setAttribute("who","Min")
                }
                console.log(this.getAttribute("who"));
            })

            document.getElementById("Optionimage").innerHTML=""
            
            for (let i = 0; i < imagePaths.length; i++) {
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", 'data:image/png;base64,'+imagePaths[i]);
                imgElement.setAttribute("width", 140);
                // imgElement.setAttribute("height", 130);
                imgElement.setAttribute("imgIndex", i);
                // imgElement.setAttribute("x", 10);
                // imgElement.setAttribute("y", i * 90); // Adjust the y position for each image
                imgElement.setAttribute("class", "optionimg");
                if(i==0){
                    imgElement.setAttribute("class", "Active optionimg");
                }
            
                document.getElementById("Optionimage").appendChild(imgElement);
            }
            
            let elm=document.querySelectorAll("#Optionimage img");
            elm.forEach(element => {
                element.addEventListener("click",function(){
                    document.querySelector(".Active").classList.remove("Active")
                    event.target.classList.add("Active")
                   let ind = event.target.getAttribute("imgIndex")
                   currentImageIndex = ind;
                   _this.updateImage();
                })
            });

            this.document.getElementById("NextBtn").addEventListener("click",function(){
                if(currentImageIndex>0){
                    document.querySelector(".Active").classList.remove("Active")
                    currentImageIndex--;
                    elm[currentImageIndex].classList.add("Active");
                    // let imgelm =document.querySelector("#Optionimage")
                    // console.log(imgelm.style.transform)
                    // let oldvalue = imgelm.style.transform?Number(imgelm.style.transform.match(/translateY\(([^)]+)\)/)[1].split("px")[0]):0;
                    // console.log(oldvalue);
                    // if(oldvalue<0){
                    //     oldvalue=oldvalue+90;
                    //     anime({
                    //         targets: "#Optionimage",
                    //         translateY:oldvalue+"px",
                    //         duration: 500,
                    //         easing: 'easeInOutQuad',
                    //     });
                    // }
                                        anime({
                        targets: "#Optionimage",
                        scrollTop: currentImageIndex*100,
                        duration: 500, 
                        easing: 'easeInOutQuad', 
                    });
                    _this.updateImage();
                }
            })

            
            this.document.getElementById("PrevBtn").addEventListener("click",function(){
                if(currentImageIndex<imagePaths.length-1){
                    document.querySelector(".Active").classList.remove("Active")
                    currentImageIndex++;
                    elm[currentImageIndex].classList.add("Active");

                    // let imgelm =document.querySelector("#Optionimage")
                    // console.log(imgelm.style.transform)
                    // let oldvalue = imgelm.style.transform?Number(imgelm.style.transform.match(/translateY\(([^)]+)\)/)[1].split("px")[0]):0;
                    // console.log(oldvalue);
                    // if(52*imagePaths.length>=Math.abs(oldvalue)){
                    //     oldvalue=Math.abs(oldvalue)+80;
                    //     anime({
                    //         targets: "#Optionimage",
                    //         translateY:-Math.abs(oldvalue)+"px",
                    //         duration: 500,
                    //         easing: 'easeInOutQuad',
                    //     });
                    // }

                    anime({
                        targets: "#Optionimage",
                        scrollTop: currentImageIndex*100,
                        duration: 500, 
                        easing: 'easeInOutQuad', 
                    });
                        _this.updateImage();
                }
            })






            this.colSelector = this.menuForm.querySelector("input#col-input");
            const o = this.onColChange.bind(this);
            // this.colSelector.addEventListener("change", o);
            // this.colSelector.addEventListener("blur", o);
            this.rowSelector = this.menuForm.querySelector("input#row-input");
            const h = this.onRowChange.bind(this);
            // this.rowSelector.addEventListener("change", h);
            // this.rowSelector.addEventListener("blur", h);
            this.sizeCountDisplay = this.menuForm.querySelector("#size-count");
            // this.fixedPatternCheckbox = this.menuForm.querySelector("input#fixed-pattern");
            this.imagePreview = this.menuForm.querySelector("img#preview");
            this.submitButton = this.menuForm.querySelector("button[type=\"submit\"]");

            
            (i = this.root.querySelector("#new-game")) === null || i === void 0 ? void 0 : i.addEventListener("click", this.menu.bind(this));
            (s = this.root.querySelector("#save-game")) === null || s === void 0 ? void 0 : s.addEventListener("click", this.save.bind(this));


            this.imageElement = t.querySelector("image#img");
            window.addEventListener("resize", this.onWindowResize.bind(this));
            Object.assign(this, n.registerDraggable(t, this.onDrag.bind(this), this.onDrop.bind(this)));

            
            this.load();
            this.onWindowResize()
        }
        get xCount() {
            return this._xc
        }
        set xCount(t) {
            this._xc = 4;
            this._yc = 2;
            if (this._yc < 2 || !Number.isFinite(this._yc)) {
                this._xc = Math.round(2 / this.height * this.width);
                this._yc = 2
            }
        }
        get yCount() {
            return this._yc
        }
        set yCount(t) {
            this._yc = t;
            this._xc = Math.round(t / this.height * this.width);
            if (this._xc < 2 || !Number.isFinite(this._xc)) {
                this._xc = 2;
                this._yc = Math.round(2 / this.width * this.height)
            }
        }
        async updateImage(t) {
            const thisisimg = 'data:image/png;base64,'+imagePaths[currentImageIndex];
            document.getElementById("refranceImg").setAttribute("href",thisisimg)
            const e = thisisimg
            const {
                width: i,
                height: s
            } = await r.getImageDimensions(e);
            this.imageUrl = e;
            this.width = i;
            this.height = s;
            this.xCount = Math.round(i / 100);

            this.submitButton.disabled = false;

            document.querySelector("#hideitmenu").style.display="none"
            document.querySelector("button[type=\"submit\"]").click()
          
    }
        calculateTheshold() {
            this.theshold = Math.max(3, Math.sqrt((this.width / this._xc) ** 2 + (this.height / this._yc) ** 2) / 20)
        }
        init() {
            
            r.clearChildren(this.pathGroup);
            r.clearChildren(this.instanceGroup);
            r.clearChildren(this.masksElement);
            h.hideCetificate();
            const t = this._xc * 100;
            this.height *=430/ this.width;
            this.width = 430;
            this.time = 0;
            this.baseTime = 0;
            this.startTime = new Date;
            this.calculateTheshold();
            delete this.endTime;
            delete this.resumeTime;
            // this.timeDisp.textContent = "--:--";
            if (this.timer != null) {
                // clearInterval(this.timer);
                delete this.timer
            }
            const e = new s.JigsawGenerator({
                width: this.width,
                height: this.height,
                xCount: this._xc,
                yCount: this._yc,
                radius: Math.min(this.width / this._xc, this.height / this._yc) / 10,
                fixedPattern: true
            }).toSvgElements(this.document, this.pathGroup);
            const i = Math.max(920, this.width * 1.5);
            const n = Math.max(450, this.height * 1.5);

            this.root.setAttribute("viewBox", `0 0 920 450`);
            this.imageElement.href.baseVal = this.imageUrl;
            console.log(i,n)
            this.imageElement.setAttribute("width", this.width.toString());
            this.imageElement.setAttribute("height", this.height.toString());

            var clonedElement = this.imageElement.cloneNode(true);
            console.log(clonedElement)

            const o = this.document.createDocumentFragment();
            const a = this.document.createDocumentFragment();
            
            let FixedPice=Math.floor(Math.random() * 7) + 0;
            let tempinc=0
            for (const t of e) {
                const test = a.appendChild(this.document.createElementNS(r.NS_SVG, "use"));
                test.setAttribute("class", `outline`);
                test.href.baseVal = `#${t.id}`;
                
                const e = o.appendChild(this.document.createElementNS(r.NS_SVG, "mask"));
                e.id = `${t.id}-m`;
                const s = e.appendChild(this.document.createElementNS(r.NS_SVG, "use"));
                s.href.baseVal = `#${t.id}`;
                const h = a.appendChild(this.document.createElementNS(r.NS_SVG, "g"));
                h.id = `${t.id}-i`;
                // console.log(tempinc,FixedPice)
                h.classList.add("draggable");
                if(tempinc==FixedPice){
                    h.classList.add("Nodraggable");
                }else{
                }
                

                const c = h.appendChild(this.document.createElementNS(r.NS_SVG, "use"));
                c.href.baseVal = `#${this.imageElement.id}`;
                c.setAttribute("mask", `url(#${e.id})`);
                const u = h.appendChild(this.document.createElementNS(r.NS_SVG, "use"));
                
                u.classList.add("handler", "pzoverlay");
                u.href.baseVal = `#${t.id}`;
                const d = l.exec(t.id);
                // console.log(u)

                if (d) {
                    const t = this.width / this._xc ;
                    const e = this.height / this._yc;
                    var newY= 40+e;
                    if(d[0].split("-")[2]=="0"){
                        newY= newY+e;
                    }
                    // h.transform.baseVal.appendItem(this.root.createSVGTransform()).setScale(0.5,0.5)
                    // console.log(h);
                    // if(tempinc!=FixedPice){
                        const maxX = 150; // Set the maximum value for the x-coordinate

// Generate a random number between 0 and the specified maximum
const randomX = Math.round(Math.random() * Math.min(maxX, (i - t) - parseInt(d[1], 10) * t));

// h.transform.baseVal.appendItem(this.root.createSVGTransform())
//   .setTranslate(randomX, newY);

                        anime({
                            targets: h,
                            // translateY:newY,
                            // translateX:randomX,
                            transform:`translate(${randomX} ${newY})`,
                            duration: 1500,
                            delay:anime.stagger(500, { start: 500 }),
                            easing: 'easeInOutQuad',
                        });

                    // }
                        

                    // h.transform.baseVal.appendItem(this.root.createSVGTransform()).setTranslate(Math.round(Math.random() * (i - t) - parseInt(d[1], 10) * t), Math.round(Math.random() * (n - e) - parseInt(d[2], 10) * e))
                }
                tempinc++;
            }
            console.log(this.instanceGroup);
            this.masksElement.appendChild(o);
            
            this.instanceGroup.appendChild(a);
            this.instanceGroup.appendChild(clonedElement);
            clonedElement.setAttribute("id","finalImage")
            clonedElement.style.opacity="0"

            this.serializeToData();
            this.onWindowResize()

            

            // dragElement(document.querySelectorAll(".draggable"))
            
            
        }

        onDrag(t) {
            
            
            t.classList.add("grabbing");
            
// const currentTransform = window.getComputedStyle(t).getPropertyValue('transform');
// const newTransform = `scale(1) ${currentTransform}`;
// t.style.transform = newTransform;

            // if (this.timer != null) return;
            // this.resumeTime = new Date;
            // this.timer = window.setInterval(this.updateTime.bind(this), 1e3);
            // this.updateTime()
        }
        onDrop(t) {
            t.element.classList.remove("grabbing");
        
            const {
                id: e
            } = t.target.parentNode;
            const i = l.exec(e);
            if (!i) return;
            const s = parseInt(i[1], 10);
            const n = parseInt(i[2], 10);
        
            t.element = this.checkAndMerge(t.element, `#p-${s+1}-${n}-i`);
            t.element = this.checkAndMerge(t.element, `#p-${s-1}-${n}-i`);
            t.element = this.checkAndMerge(t.element, `#p-${s}-${n+1}-i`);
            t.element = this.checkAndMerge(t.element, `#p-${s}-${n-1}-i`);

              
        
            if (this.instanceGroup.childElementCount > 1) return;
        
            // Rest of your code...
        }
        
    
        checkAndMerge(t, e) {
            let temp_arr = t.getAttribute("transform").split("(")[1].split(")")[0].split(" ");
            let tempX=Number(temp_arr[0])
            let tempY=Number(temp_arr[1])
    
                // console.log(tempX,tempY,tempX<=10&&tempX>=-10)
                if(tempX<=40&&tempX>=-40&&tempY<=40&&tempY>=-40){
                    t.setAttribute("transform","translate(0 0)");
                    t.classList.remove("draggable");

                         // document.getElementById("makeItRain").disabled = true;
                         var end = Date.now() + (0.1 * 500);

                         function frame() {
                          confetti({
                              particleCount: 5,
                              spread: 80,
                              origin: { y: 0.35,x:0.25 }
                            });
                            
                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                            else {
                                
                                // document.getElementById("makeItRain").disabled = false;
                            }
                        };
                        
                        
                        frame();


                    let len = document.querySelectorAll(".draggable");
                    if(len.length==0){
                        let elmnt = this.document.getElementById("finalImage")
                        let elmntHide = this.document.querySelector("#ins");
                        let elmntHide2 = this.document.querySelectorAll(".hideit");
                        
                        // this.document.getElementById("finalImage").style.opacity="1";
                        let temp = [];
                        
                        for (let i = 0; i < elmntHide.children.length; i++) {
                            if(elmntHide.children[i]!=elmnt){
                                temp.push(elmntHide.children[i]) 
                            }
                        }
                        
                        elmnt.parentNode.appendChild(elmnt)

                        anime({
                            targets: [elmntHide2,temp],
                            opacity:[1,0],
                            duration: 500,
                            delay:500,
                            easing: 'easeInOutQuad',
                        });
                        anime({
                            targets: elmnt,
                            opacity:[0,1],
                            duration: 500,
                            delay:500,
                            easing: 'easeInOutQuad',
                        });
                        anime({
                            targets: elmnt,
                            scale: 1.8,
                            translateX: "30",
                            duration: 1000,
                            delay:1500,
                            easing: 'easeInOutQuad',
                        });
                        anime({
                            targets: "#footer",
                            y: "0",
                            duration: 1000,
                            delay:1500,
                            easing: 'easeInOutQuad',
                        });

                    }
                    console.log(len)
                }else{


                }

            var i;
            const s = (i = this.instanceGroup.querySelector(e)) === null || i === void 0 ? void 0 : i.closest(".draggable");
            
            if (!s || this.isDragging(s) || s === t) return t;
            const n = t.transform.baseVal;
            if (!n.numberOfItems) return t;
            const o = s.transform.baseVal;
            if (!o.numberOfItems) return t;
            const h = n.getItem(0).matrix;
            const a = o.getItem(0).matrix;
            if (Math.sqrt((h.e - a.e) ** 2 + (h.f - a.f) ** 2) > this.theshold) return t;
            const l = t.classList.contains("group");
            const c = s.classList.contains("group");
            if (l) {
                if (!c) {
                    s.classList.remove("draggable");
                    o.removeItem(0);
                    t.appendChild(s)
                } else if (s.childElementCount > t.childElementCount) {
                    
                    r.transferChildren(t, s);
                    t.remove();
                    return s
                } else {
                    r.transferChildren(s, t);
                    s.remove()
                }
                return t
            }
            if (c) {
                t.classList.remove("draggable");
                n.removeItem(0);
                s.appendChild(t);
                return s
            }
            const u = t.parentNode.appendChild(this.document.createElementNS(r.NS_SVG, "g"));
      
            u.classList.add("draggable", "group");
            u.appendChild(t);
            t.classList.remove("draggable");
            u.appendChild(s);
            s.classList.remove("draggable");
            const d = o.getItem(0);
            n.removeItem(0);
            o.removeItem(0);
            u.transform.baseVal.appendItem(d);
            return u
        }
        isDragging(t) {
            return false
        }
        updateTime() {
            this.time = Date.now() - this.resumeTime.getTime() + this.baseTime;
            this.timeDisp.textContent = r.formatTime(this.time)
        }
        menu() {
            this.menuGroup.classList.add("show");
            this.onSizeChange()
            
            
        }
        
        load() {
            // const t = JSON.parse(this.dataElement.textContent || "null");
            // if (t == null) return;
            // this.width = t.width || 1;
            // this.height = t.height || 1;
            // this.baseTime = t.time || 0;
            // this._xc = t.xCount || 1;
            // this._yc = t.yCount || 1;
            // if (t.startTime != null) this.startTime = new Date(t.startTime);
            // if (t.endTime != null) this.endTime = new Date(t.endTime);
            this.calculateTheshold()

        }
        serializeToData() {
            var t, e;
            if (this.resumeTime != null && this.endTime == null) this.updateTime();
            return
            this.dataElement.textContent = JSON.stringify({
                width: this.width,
                height: this.height,
                xCount: this._xc,
                yCount: this._yc,
                startTime: (t = this.startTime) === null || t === void 0 ? void 0 : t.getTime(),
                endTime: (e = this.endTime) === null || e === void 0 ? void 0 : e.getTime(),
                time: this.time
            })
        }
        save() {
            this.serializeToData();
            return o.downloadDocument(this.root, `puzzle-${Date.now()}.svg`, u)
        }
        onImageSelected() {
            const {
                files: t
            } = this.imageSelector;
            if (!t || !t.length) return;
            const e = t.item(0);
            this.updateImage(e)
        }
        onColChange() {
            this.xCount = 4;
            this.rowSelector.valueAsNumber = 2;
            this.colSelector.valueAsNumber = 4;
            this.onSizeChange()
        }
        onRowChange() {
            this.yCount = 2;
            this.colSelector.valueAsNumber = 4;
            this.rowSelector.valueAsNumber = 2;
            this.onSizeChange()
        }
        onSizeChange() {

            this.sizeCountDisplay.textContent = `(${4*this._yc} Pieces)`
        }
        async onMenuSubmit(t) {
            t.preventDefault();
            if (!this.imageUrl) return;
            this.init();
            this.menuForm.reset()
        }
        onMenuReset() {
            // if (this.imagePreview.src.startsWith("blob:")) URL.revokeObjectURL(this.imagePreview.src);
            // this.imagePreview.src = "";
            // this.submitButton.disabled = true;
            // this.colSelector.disabled = true;
            // this.rowSelector.disabled = true;
            // this.menuGroup.classList.remove("show")
        }
        onWindowResize() {
            return
            let t, e;
            if (!this.dataElement.textContent) {
                if (window.innerWidth > window.innerHeight) {
                    e = 480;
                    t = e / window.innerHeight * window.innerWidth
                } else {
                    t = 640;
                    e = t / window.innerWidth * window.innerHeight
                }
                this.root.setAttribute("viewBox", `0 0 ${t} ${e}`)
            } else {
                const i = this.root.viewBox.baseVal;
                t = i.width;
                e = i.height
            }
            const i = t / e;
            const s = window.innerWidth / window.innerHeight;
            const n = (i > s ? t / window.innerWidth : e / window.innerHeight) * window.devicePixelRatio;
            this.uiScaleRule.style.transform = `scale(${n})`
        }
        onPaste(t) {
            if (this.menuGroup.classList.contains("show") && t.clipboardData && t.clipboardData.files.length) {
                r.interceptEvent(t);
                this.onDragDrop(t.clipboardData)
            }
        }
        async onDragDrop(t) {
            let e = false;
            for (const i of t.items) {
                switch (i.kind) {
                    case "file": {
                        if (!i.type.startsWith("image/")) break;
                        const t = i.getAsFile();
                        if (!t) break;
                        try {
                            this.updateImage(t);
                            e = true
                        } catch {}
                        break
                    }
                    case "string":
                        switch (i.type) {
                            case "text/uri-list":
                                for (const t of (await r.toPromise(i, i.getAsString)).split("\r\n")) try {
                                    await this.updateImage(await (await fetch(t)).blob());
                                    e = true;
                                    break
                                } catch {}
                                break
                        }
                        break
                }
                if (e) break
            }
            return e
        }
    }
    e.MainHandler = c;
    new c;

    function u(t) {
        var e, i;
        t.classList.add("noscript");
        (i = (e = t.querySelector("g#ui")) === null || e === void 0 ? void 0 : e.transform.baseVal.getItem(0)) === null || i === void 0 ? void 0 : i.setScale(1, 1)
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.JigsawGenerator = void 0;
    const s = i(0);
    const n = {
        M: 2,
        m: 2,
        L: 2,
        l: 2,
        H: 1,
        h: 1,
        V: 1,
        v: 1,
        C: 6,
        c: 6,
        S: 4,
        s: 4,
        Q: 4,
        q: 4,
        T: 2,
        t: 2,
        A: 7,
        a: 7,
        z: 0
    };
    class r {
        constructor(t) {
            var e, i, n, r, o;
            this.strokes = new Map;
            this.a = 0;
            this.b = 0;
            this.c = 0;
            this.d = 0;
            this.e = 0;
            this.flip = false;
            this.width = t.width;
            this.height = t.height;
            this.xCount = t.xCount;
            this.yCount = t.yCount;
            this.tabSize = (e = t.tabSize) !== null && e !== void 0 ? e : .1;
            this.jitter = (i = t.jitter) !== null && i !== void 0 ? i : .04;
            this.seed = s.getSeed((n = t.seed) !== null && n !== void 0 ? n : Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER));
            this.radius = Math.min((r = t.radius) !== null && r !== void 0 ? r : 0, this.sl, this.sw);
            this.fixedPattern = t.fixedPattern ? Math.floor(this.random() * 2 + 1) : 0;
            this.vertical = false;
            for (this.yi = 1; this.yi < this.yCount; this.yi++) {
                this.first();
                for (this.xi = 0; this.xi < this.xCount; this.xi++) {
                    this.next();
                    this.pushStroke(this.xi + this.xCount * (this.yi - 1), this.generateStroke(true));
                    this.pushStroke(this.xi + this.xCount * this.yi, this.generateStroke())
                }
            }
            this.vertical = true;
            for (this.xi = 1; this.xi < this.xCount; this.xi++) {
                this.first();
                for (this.yi = 0; this.yi < this.yCount; this.yi++) {
                    this.next();
                    this.pushStroke(this.xi - 1 + this.xCount * this.yi, this.generateStroke());
                    this.pushStroke(this.xi + this.xCount * this.yi, this.generateStroke(true))
                }
            }
            this.vertical = false;
            this.pushStroke(0, {
                points: [0, s.round(this.sw, 3), 0, this.radius, this.radius, this.radius, 0, 0, 1, this.radius, 0],
                inst: ["M", "L", "A"]
            });
            this.vertical = true;
            this.pushStroke(this.xCount - 1, {
                points: [s.round(this.width - this.sw), 0, this.width - this.radius, 0, this.radius, this.radius, 0, 0, 1, this.width, this.radius],
                inst: ["M", "L", "A"]
            });
            this.vertical = false;
            this.pushStroke(this.xCount * this.yCount - 1, {
                points: [this.width, s.round(this.height - this.sw, 3), this.width, this.height - this.radius, this.radius, this.radius, 0, 0, 1, this.width - this.radius, this.height],
                inst: ["M", "L", "A"]
            });
            this.vertical = true;
            this.pushStroke(this.xCount * (this.yCount - 1), {
                points: [s.round(this.sw, 3), this.height, this.radius, this.height, this.radius, this.radius, 0, 0, 1, 0, this.height - this.radius],
                inst: ["M", "L", "A"]
            });
            this.cells = [];
            for (const [t, e] of this.strokes) {
                const i = Math.trunc(t / this.xCount);
                ((o = this.cells[i]) !== null && o !== void 0 ? o : this.cells[i] = [])[t % this.xCount] = this.getNormalizedStroke(e)
            }
            this.strokes.clear()
        }
        get sl() {
            return this.vertical ? this.height / this.yCount : this.width / this.xCount
        }
        get sw() {
            return this.vertical ? this.width / this.xCount : this.height / this.yCount
        }
        get ol() {
            return this.sl * (this.vertical ? this.yi : this.xi)
        }
        get ow() {
            return this.sw * (this.vertical ? this.xi : this.yi)
        }
        toSvgElements(t, e) {
            const i = [];
            const n = e != null ? t.createDocumentFragment() : null;
            for (let e = 0; e < this.cells.length; e++) {
                const r = this.cells[e];
                for (let o = 0; o < r.length; o++) {
                    const h = t.createElementNS(s.NS_SVG, "path");
                    h.setAttribute("d", r[o]);
                    h.id = `p-${o}-${e}`;
                    i.push(h);
                    n === null || n === void 0 ? void 0 : n.appendChild(h)
                }
            }
            e === null || e === void 0 ? void 0 : e.appendChild(n);
            return i
        }
        generateStroke(t) {
            const {
                a: e,
                b: i,
                c: s,
                d: n,
                e: r,
                tabSize: o
            } = this;
            const h = this.l(0);
            const a = this.w(0);
            const l = this.l(.2);
            const c = this.w(e);
            const u = this.l(.5 + i + n);
            const d = this.w(-o + s);
            const m = this.l(.5 - o + i);
            const f = this.w(o + s);
            const p = this.l(.5 - 2 * o + i - n);
            const g = this.w(3 * o + s);
            const v = this.l(.5 + 2 * o + i - n);
            const w = this.w(3 * o + s);
            const S = this.l(.5 + o + i);
            const b = this.w(o + s);
            const C = this.l(.5 + i + n);
            const y = this.w(-o + s);
            const x = this.l(.8);
            const E = this.w(r);
            const T = this.l(1);
            const M = this.w(0);
            return {
                points: this.vertical ? t ? [M, T, E, x, y, C, b, S, w, v, g, p, f, m, d, u, c, l, a, h] : [a, h, c, l, d, u, f, m, g, p, w, v, b, S, y, C, E, x, M, T] : t ? [T, M, x, E, C, y, S, b, v, w, p, g, m, f, u, d, l, c, h, a] : [h, a, l, c, u, d, m, f, p, g, v, w, S, b, C, y, x, E, T, M],
                inst: ["M", "C", "C", "C"]
            }
        }
        random() {
            const t = Math.sin(this.seed++) * 1e4;
            return t - Math.floor(t)
        }
        nextJitter() {
            return this.random() * this.jitter * 2 - this.jitter
        }
        first() {
            this.e = this.nextJitter()
        }
        next() {
            const t = this.flip;
            switch (this.fixedPattern) {
                case 1:
                case 2:
                    this.flip = (this.xi + this.yi) % 2 === (this.fixedPattern + (this.vertical ? 1 : 0)) % 2;
                    break;
                default:
                    this.flip = this.random() >= .5;
                    break
            }
            this.a = this.flip === t ? -this.e : this.e;
            this.b = this.nextJitter();
            this.c = this.nextJitter();
            this.d = this.nextJitter();
            this.e = this.nextJitter()
        }
        l(t) {
            return s.round(this.ol + this.sl * t, 3)
        }
        w(t) {
            return s.round(this.ow + this.sw * t * (this.flip ? -1 : 1), 3)
        }
        pushStroke(t, e) {
            const i = this.strokes.get(t);
            if (i) i.push(e);
            else this.strokes.set(t, [e])
        }
        getNormalizedStroke(t) {
            if (t == null || !t.length) return "";
            if (t.length > 1) {
                const e = new Set(t);
                const i = {
                    points: [],
                    inst: []
                };
                while (e.size) {
                    let t = false;
                    for (const s of e)
                        if (!i.points.length) {
                            i.points = s.points;
                            i.inst = s.inst;
                            t = true;
                            e.delete(s);
                            break
                        } else if (Math.abs(i.points[0] - s.points[s.points.length - 2]) < 1 && Math.abs(i.points[1] - s.points[s.points.length - 1]) < 1) {
                        i.points.splice(0, 2, ...s.points);
                        i.inst.splice(0, 1, ...s.inst);
                        t = true;
                        e.delete(s);
                        break
                    } else if (Math.abs(s.points[0] - i.points[i.points.length - 2]) < 1 && Math.abs(s.points[1] - i.points[i.points.length - 1]) < 1) {
                        s.points.splice(0, 2, ...i.points);
                        s.inst.splice(0, 1, ...i.inst);
                        i.points = s.points;
                        i.inst = s.inst;
                        t = true;
                        e.delete(s);
                        break
                    }
                    if (!t) break
                }
                t = [i]
            }
            const {
                points: e,
                inst: i
            } = t[0];
            let s = 0;
            let r = "";
            for (const t of i) {
                r += t;
                const i = n[t];
                if (i) r += e.slice(s, s += i).join(" ")
            }
            return r + "z"
        }
    }
    e.JigsawGenerator = r
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.registerDraggable = void 0;
    const s = i(0);

    function n(t = document, e, i, n = ".draggable", o = ".handler") {
        const h = new Map;
        const a = new Map;
        t.addEventListener("mousedown", u, true);
        t.addEventListener("mousemove", f);
        t.addEventListener("mouseup", v);
        t.addEventListener("mouseleave", v);
        t.addEventListener("touchstart", d, {
            capture: true,
            passive: false
        });
        t.addEventListener("touchmove", p, {
            passive: false
        });
        t.addEventListener("touchend", w, {
            passive: false
        });
        t.addEventListener("touchcancel", w, {
            passive: false
        });

        function l(t) {
            const e = a.get(t.identifier);
            return e && e.identifier == null === t instanceof MouseEvent ? e : null
        }

        function c(t) {
            let {
                target: e
            } = t;
            if (!(e instanceof Element)) return;
            e = e.closest(`${n} ${o}, ${n}${o}`);
            if (e instanceof SVGGraphicsElement) return e
        }

        function u(t) {
            
            if (t.button !== 0) return;
            const e = c(t);
            if (!e) return;
            m(e, t, t.ctrlKey || t.shiftKey);
            s.interceptEvent(t)
        }

        function d(t) {
            
            const e = t.targetTouches.item(0);
            if (!e) return;
            const i = c(t);
            if (!i) return;
            m(i, e, t.ctrlKey || t.shiftKey);
            s.interceptEvent(t)
        }

        function m(t, i, s) {
            var o;
            const l = t.ownerSVGElement;
            const c = t.matches(n) ? t : t.closest(n);
            if (h.has(c)) return;
            const u = c.transform.baseVal;
            if (!u.numberOfItems || u.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                const t = l.createSVGTransform();
                t.setTranslate(0, 0);
                u.insertItemBefore(t, 0)
            }
            const d = u.getItem(0);
            const m = r(l, i, c.parentNode).matrixTransform(d.matrix.inverse());
            const {
                identifier: f
            } = i;
            const p = {
                element: c,
                target: t,
                identifier: f,
                transform: d,
                offsetX: m.x,
                offsetY: m.y
            };
            h.set(c, p);
            a.set(f, p);
            if (c.nextSibling && s)(o = c.parentNode) === null || o === void 0 ? void 0 : o.appendChild(c);
            else p.bringToFrontAfter = true;
            e === null || e === void 0 ? void 0 : e(c)
        }

        function f(t) {
            if (a.size && t.button === 0 && g(t)) s.interceptEvent(t)
        }

        function p(t) {
            if (a.size && t.changedTouches.length && Array.prototype.map.call(t.changedTouches, g).includes(true)) s.interceptEvent(t)
        }

        function g(t) {
            // draggable
            function findParentBySelector(e,r){//Independent//e=target elm,r= selector
                var n=e.outerHTML.search(r);for(var o=document.querySelectorAll(r),t=e.parentNode;t&&!function(e,r){for(var n=0,o=e.length;n<o;n++)if(e[n]==r)return 1}(o,t);)t=t.parentNode;return t||(-1<n?e:t)
            }
            
            
            let elm = findParentBySelector(t.target,"g");
            if(elm.tagName=="g"){
                if(t.type=="mousemove"){elm.parentNode.appendChild(elm)}
            }
            
            const e = l(t);
            if (!e) return false;
            const i = r(e.element.ownerSVGElement, t, e.element.parentNode);
            i.x -= e.offsetX;
            i.y -= e.offsetY;
            if(t.offsetX<=1550){
            }
            e.transform.setTranslate(i.x, i.y);

            
            // if(!t.target.parentElement.getAttribute("class").split(" ").includes("Nodraggable")){

            // }
            // console.log(t.target.parentElement.getAttribute("class").split(" ").includes("Nodraggable"));

            // e.target.parentNode.setAttribute("transform",`translate(${i.x} ${i.y}) `)
            return true
        }

        function v(t) {
            if (a.size && S(t)) s.interceptEvent(t)
        }

        function w(t) {
            if (a.size && t.changedTouches.length && Array.prototype.map.call(t.changedTouches, S).includes(true)) s.interceptEvent(t)
        }

        function S(t) {
            var e;
            const s = l(t);
            if (!s) return false;
            h.delete(s.element);
            a.delete(s.identifier);
            if (s.bringToFrontAfter)(e = s.element.parentNode) === null || e === void 0 ? void 0 : e.appendChild(s.element);
            i === null || i === void 0 ? void 0 : i(s);
            return true
        }
        return {
            isDragging(t) {
                return h.has(t)
            }
        }
    }
    e.registerDraggable = n;

    function r(t, e, i) {
        const s = t.createSVGPoint();
        s.x = e.clientX;
        s.y = e.clientY;
        return i != null ? s.matrixTransform(i instanceof SVGGraphicsElement ? i.getScreenCTM().inverse() : i) : s
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.downloadDocument = void 0;
    const s = i(0);
    async function n(t, e, i) {
        const n = t.ownerDocument;
        const a = n.implementation.createDocument(s.NS_SVG, "svg", null);
        const l = a.importNode(t, true);
        a.replaceChild(l, a.firstChild);
        await Promise.all(Array.prototype.map.call(l.querySelectorAll("script"), r));
        await (i === null || i === void 0 ? void 0 : i(l, a));
        l.querySelectorAll("style").forEach(h);
        o(a);
        const c = new Blob([(new XMLSerializer).serializeToString(a)], {
            type: "image/svg+xml"
        });
        const u = n.createElementNS(s.NS_XHTML, "a");
        u.href = URL.createObjectURL(c);
        u.download = e;
        u.click();
        URL.revokeObjectURL(u.href)
    }
    e.downloadDocument = n;
    async function r(t) {
        if (t instanceof HTMLScriptElement) {
            const {
                src: e
            } = t;
            if (!e) return;
            t.removeAttribute("src");
            t.textContent = await (await fetch(e)).text()
        } else if (t instanceof SVGScriptElement) {
            const e = t.href.baseVal;
            if (!e) return;
            t.removeAttribute("href");
            t.appendChild(t.ownerDocument.createCDATASection(await (await fetch(e)).text()))
        }
    }

    function o(t) {
        var e;
        const i = (e = t.ownerDocument) !== null && e !== void 0 ? e : t;
        const n = i.createTreeWalker(t, NodeFilter.SHOW_TEXT);
        const r = [];
        const o = [];
        let h;
        while (h = n.nextNode()) {
            if (!(h instanceof Text) || h instanceof CDATASection) continue;
            if (s.spaceMatcher.test(h.wholeText)) r.push(h);
            else o.push(h)
        }
        for (const t of r) t.remove();
        for (const t of o) {
            const e = t.wholeText;
            const i = e.replaceAll(s.trimmableMatcher, " ");
            if (e !== i) t.replaceWith(t.ownerDocument.createTextNode(i))
        }
        return t
    }

    function h(t) {
        var e;
        const i = (e = t.textContent) === null || e === void 0 ? void 0 : e.replaceAll(s.styleSpaceMatcher, "");
        if (i == null) return;
        try {
            const e = t.firstChild;
            if (e instanceof CDATASection && !i.includes(s.CDATA_END)) {
                const e = t.ownerDocument.createCDATASection(i);
                t.textContent = "";
                t.appendChild(e)
            } else t.textContent = i
        } catch {
            t.textContent = i
        }
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    // e.hideCetificate = e.showCertificate = void 0;
    const s = i(0);
    
    // const n = document.querySelector("#certificate");
    // const r = n.querySelector("text#time-start");
    // const o = n.querySelector("text#time-end");
    // const h = n.querySelector("text#time-used");
    // const a = n.querySelector("text#puzzle-size");

    function l(t) {
        n.classList.add("show");
        n.setAttribute("visibility", "visible");
        n.setAttribute("pointer-events", "visible");
        r.textContent = s.formatDateTime(t.startTime);
        o.textContent = s.formatDateTime(t.endTime);
        h.textContent = s.formatTime(t.time);
        a.textContent = `${t.xCount}×${t.yCount} (${t.xCount*t.yCount} Pieces)`
        
    }
    // e.showCertificate = l;

    function c() {
        // n.classList.remove("show");
        // r.textContent = "";
        // o.textContent = "";
        // h.textContent = "";
        // a.textContent = ""
        
    }
    e.hideCetificate = c
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.registerDropZone = void 0;
    const s = i(0);

    function n(t, e, i, s, n) {
        const h = e != null ? null : o;
        t.addEventListener("dragenter", r(i !== null && i !== void 0 ? i : h));
        t.addEventListener("dragover", r(s !== null && s !== void 0 ? s : h));
        t.addEventListener("dragleave", r(n));
        t.addEventListener("drop", r(e))
    }
    e.registerDropZone = n;

    function r(t) {
        return t != null ? e => {
            s.interceptEvent(e);
            if (e.dataTransfer != null) t(e.dataTransfer)
        } : s.interceptEvent
    }

    function o(t) {
        t.dropEffect = "none"
    }
}]);

  function exitFullscreen(){
    const element = document.documentElement;
    // If the document is currently in fullscreen mode, exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  function openFullscreen(){
    const sendMessage = () => {
  const message = 'Hello, receiver!';
  window.postMessage(message, '*'); // '*' allows communication with any origin
};
      const element = document.documentElement;
      console.log(window,"thiss")
    // If not in fullscreen mode, request fullscreen
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
//# sourceMappingURL=main.js.map