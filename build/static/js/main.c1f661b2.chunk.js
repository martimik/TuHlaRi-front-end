(this.webpackJsonptuhlari=this.webpackJsonptuhlari||[]).push([[0],{116:function(e,t,a){e.exports=a(154)},121:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),c=a.n(o),l=(a(121),a(14)),i=a(26),s=a.n(i),u=a(62),m=a(37),p=a(193),d=a(92),g=a(10),h=a(202),f=a(46),b=window.location.host.includes("localhost")?"http://localhost:8080/":"http://nodejs-mongo-persistent-tuhlari.rahtiapp.fi/";function E(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function v(e){var t=y(),a=Object(n.useState)({user:"",password:""}),o=Object(l.a)(a,2),c=o[0],i=o[1],u=e.isOpen,m=e.setAuthorization,d=e.close,v=Object(f.useSnackbar)().enqueueSnackbar;function O(e){i(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?E(a,!0).forEach((function(t){Object(g.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):E(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},c,Object(g.a)({},e.target.name,e.target.value)))}return e.authorization.email?r.a.createElement("div",{className:u?"login login-open":"login login-closed"},r.a.createElement("form",{className:t.form,onSubmit:function(e){e.preventDefault(),s.a.post(b+"logout").then((function(e){var t=e.data,a=t.email,n=t.name,r=t.userGroup;m({email:a,name:n,userGroup:r}),v("Successfully logged out",{variant:"info"}),d()})).catch((function(e){console.error(e)}))}},r.a.createElement(p.a,{type:"submit",className:t.root,variant:"contained",color:"primary"},"Logout"))):r.a.createElement("div",{className:u?"login login-open":"login login-closed"},r.a.createElement("form",{className:t.form,onSubmit:function(e){e.preventDefault(),console.log(c),s.a.post(b+"login",{},{auth:{username:c.user,password:c.password}}).then((function(e){var t=e.data,a=t.email,n=t.name,r=t.userGroup;a&&r?(m({email:a,name:n,userGroup:r}),i({user:"",password:""}),v("Successfully logged in",{variant:"success",anchorOrigin:{vertical:"bottom",horizontal:"center"}}),d()):v("Failed to login",{variant:"error",anchorOrigin:{vertical:"bottom",horizontal:"center"}})})).catch((function(e){console.error(e),v("Failed to login",{variant:"error",anchorOrigin:{vertical:"bottom",horizontal:"center"}})}))}},r.a.createElement(h.a,{onChange:O,id:"standard-password-input",label:"Username",name:"user",className:t.textField,autoComplete:"current-password",margin:"normal",value:c.user}),r.a.createElement(h.a,{onChange:O,id:"standard-password-input",label:"Password",name:"password",className:t.textField,type:"password",autoComplete:"current-password",margin:"normal",value:c.password}),r.a.createElement(p.a,{type:"submit",className:t.root,variant:"contained",color:"primary"},"Login")))}var y=Object(d.a)((function(e){return{textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200},form:{display:"flex",flexDirection:"column",padding:"1rem",borderRadius:"1.5rem"}}})),O=a(99),x=a.n(O);function w(e){var t=j(),a=Object(n.useState)(!1),o=Object(l.a)(a,2),c=o[0],i=o[1],s=e.authorization,m=e.setAuthorization;return r.a.createElement("nav",{className:"nav-bar"},r.a.createElement("ul",null,e.links.map((function(e,a){return r.a.createElement("li",{key:a},r.a.createElement(u.b,{to:e.url},r.a.createElement(p.a,{className:t.button},e.name)))}))),r.a.createElement(p.a,{onClick:function(){i(!c)},color:"primary",className:t.button},s.email?"Logged in":"Login"," ",r.a.createElement(x.a,{className:c?t.loginIconUp:t.loginIconDown})),r.a.createElement(v,{isOpen:c,close:function(){return i(!1)},setAuthorization:m,authorization:s}))}var j=Object(d.a)({root:{background:"black",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:48,padding:"0 30px"},loginIconUp:{transform:"rotate(-180deg)",transition:"all 0.25s"},loginIconDown:{transition:"all 0.25s",transform:"rotate(0deg)"},button:{color:"white",marginRight:"20px",padding:"10px 10px","&:hover":{backgroundColor:"a90018"}}}),N=a(34),k=a(24),C=a(63),S=a(64),P=a(66),D=function(e){function t(e){var a;return Object(N.a)(this,t),(a=Object(C.a)(this,Object(S.a)(t).call(this,e))).state={},a}return Object(P.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){return this.props.product?r.a.createElement("div",{className:"product"},r.a.createElement("div",{className:"product-header"},r.a.createElement("h1",null,this.props.product.productName),r.a.createElement("img",{className:"logo-large",src:this.props.product.logo||"https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",alt:this.props.product.productName})),r.a.createElement("div",null,r.a.createElement("p",{className:"product-short-description"},this.props.product.shortDescription)),r.a.createElement("div",null,r.a.createElement("p",{className:"product-long-description"},this.props.product.longDescription),r.a.createElement("div",{className:"product-info-list"},r.a.createElement("div",null,r.a.createElement("p",null,"Teknologiat"),r.a.createElement("ul",null,this.props.product.technologies.map((function(e,t){return r.a.createElement("li",{key:t},e)})))),r.a.createElement("div",null,r.a.createElement("p",null,"Komponentit"),r.a.createElement("ul",null,this.props.product.components.map((function(e,t){return r.a.createElement("li",{key:t},e)}))))),r.a.createElement("p",{className:"product-requirement"},this.props.product.requirement||null),r.a.createElement("p",{className:"product-customer"},this.props.product.customer||null),r.a.createElement("p",{className:"product-lifecycle"},this.props.product.lifecycle||null),r.a.createElement("p",{className:"product-business-owner"},this.props.product.businessOwner||null),r.a.createElement("p",{className:"product-pricing"},this.props.product.pricing||null))):r.a.createElement("div",null,r.a.createElement("p",null,"Please select an item"))}}]),t}(r.a.Component),R=a(207),F=a(197),I=a(198),W=a(75),z=a.n(W),L=a(103);function q(e){var t=e.name,a=e.products,n=T();return r.a.createElement("div",null,r.a.createElement(R.a,{className:n.root,defaultExpanded:e.defaultExpanded},r.a.createElement(F.a,{expandIcon:r.a.createElement(z.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},r.a.createElement(L.a,{className:n.heading},t)),r.a.createElement(I.a,null,r.a.createElement("ul",{className:n.products},a.map((function(t,o){return r.a.createElement("li",{key:t._id,className:e.selected===t._id?n.productSelected:n.product,onClick:function(){return e.setProduct(a[o])}},r.a.createElement("div",{className:n.productContainer},r.a.createElement("img",{className:"logo-normal",src:t.logo||"https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",alt:t.productName}),r.a.createElement("p",null,((c=t.productName).length>24&&(c=c.slice(0,24)+"..."),c))),r.a.createElement("div",null,r.a.createElement(z.a,null)));var c}))))))}var T=Object(d.a)((function(e){return{root:{padding:0,"& .MuiExpansionPanelDetails-root":{padding:0}},heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular},products:{listStyle:"none",padding:0,margin:0},product:{minWidth:300,padding:"0.5rem 0",backgroundColor:"#f5f5f5",boxShadow:"1px 5px 10px 1px #c5c5c5",borderTop:"1px solid #c9c9c9",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:"10px solid #cfcfcf","& svg":{transform:"rotate(-90deg)",marginRight:10,opacity:0},"&:hover":{backgroundColor:"#e4e4e4",transition:"all 250ms",cursor:"pointer",borderLeft:"10px solid #989898","& svg":{opacity:1}}},productContainer:{display:"flex",alignItems:"center",justifyContent:"space-around",marginLeft:10,minWidth:130,"& p":{marginLeft:20,width:200,textAlign:"left"}},productSelected:{minWidth:300,padding:"0.5rem 0",backgroundColor:"#dbdbdb",boxShadow:"1px 5px 10px 1px #c5c5c5",borderTop:"1px solid #c9c9c9",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:"10px solid #d8001f","& svg":{transform:"rotate(90deg)",transition:"transform 200ms",marginRight:10},"&:hover":{cursor:"pointer","& svg":{marginRight:10}}}}})),K=a(100),A=a.n(K),G=a(105),H=a(7);function B(e){var t=U();return r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(A.a,null)),r.a.createElement(G.a,{placeholder:"Search\u2026",onChange:e.onSearch,classes:{root:t.inputRoot,input:t.inputInput},inputProps:{"aria-label":"search"}}))}var U=Object(d.a)((function(e){return{grow:{flexGrow:1},search:Object(g.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(H.d)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(H.d)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{width:"auto"}),searchIcon:{width:e.spacing(7),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(g.a)({padding:e.spacing(1,1,1,7),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:200})}})),V=function(e){function t(e){var a;return Object(N.a)(this,t),(a=Object(C.a)(this,Object(S.a)(t).call(this,e))).onSearch=function(e){a.setState({searchQuery:e.target.value})},a.setProduct=function(e){a.setState({currentProduct:a.state.currentProduct===e?null:e})},a.state={currentProduct:null,products:[]},a}return Object(P.a)(t,e),Object(k.a)(t,[{key:"componentDidMount",value:function(){this.getProducts()}},{key:"getProducts",value:function(){var e=this;s.a.get(b+"products").then((function(t){console.log(t.data),e.setState({products:t.data})}))}},{key:"render",value:function(){var e=this.state.currentProduct,t=e?e._id:"",a=this.state.products.filter((function(e){return("admin@admin.com"===e.creator||"admin@admin.com"===e.productOwner||"admin@admin.com"===e.salesPerson)&&!1===e.isIdea})),n=this.state.products.filter((function(e){return e.isIdea})),o=this.state.products.filter((function(e){return!a.includes(e)&&!e.isIdea}));return r.a.createElement("div",{className:"products"},r.a.createElement("div",{className:"sidebar"},r.a.createElement(B,{onSearch:this.onSearch}),r.a.createElement(q,{defaultExpanded:!0,setProduct:this.setProduct,selected:t,products:a,name:"Omat tuotteet"}),r.a.createElement(q,{setProduct:this.setProduct,selected:t,products:n,name:"Ideat"}),r.a.createElement(q,{setProduct:this.setProduct,selected:t,products:o,name:"Julkiset tuotteet"})),r.a.createElement(D,{product:this.state.currentProduct}))}}]),t}(r.a.Component),J=a(27),_=a(205),M=a(102),Q=a.n(M),$=a(199),X=a(196),Y=a(101),Z=a.n(Y),ee=a(160),te=a(204),ae=a(200),ne=a(203),re=a(201),oe=a(208);function ce(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function le(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ce(a,!0).forEach((function(t){Object(g.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ce(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function ie(){var e=se(),t=Object(n.useState)({productName:"",shortDescription:"",longDescription:"",pricing:"",salesPerson:"",productOwner:"",businessType:"",lifecycleStatus:"",technology:"",component:"",environmentRequirement:"",customer:""}),a=Object(l.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(!1),u=Object(l.a)(i,2),m=u[0],d=(u[1],Object(n.useState)(!1)),E=Object(l.a)(d,2),v=E[0],y=E[1],O=Object(n.useState)([]),x=Object(l.a)(O,2),w=x[0],j=x[1],N=Object(n.useState)([]),k=Object(l.a)(N,2),C=k[0],S=k[1],P=Object(n.useState)([]),D=Object(l.a)(P,2),R=D[0],F=D[1],I=Object(n.useState)([]),W=Object(l.a)(I,2),z=W[0],L=W[1],q=Object(n.useState)(null),T=Object(l.a)(q,2),K=T[0],A=T[1],G=Object(n.useState)(),H=Object(l.a)(G,2),B=H[0],U=H[1],V=Object(n.useState)(!0),M=Object(l.a)(V,2),Y=M[0],ce=M[1],ie=Object(f.useSnackbar)().enqueueSnackbar;function ue(e){c(le({},o,Object(g.a)({},e.target.name,e.target.value)))}function me(e){j(w.filter((function(t,a){return e!==a})))}function pe(e){S(C.filter((function(t,a){return e!==a})))}function de(e){L(z.filter((function(t,a){return e!==a})))}function ge(e){F(R.filter((function(t,a){return e!==a})))}function he(e){"Enter"===e.key&&e.preventDefault()}function fe(e){if("Enter"===e.key){e.preventDefault();var t=o.component,a=o.technology,n=o.environmentRequirement,r=o.customer;switch(e.target.name){case"component":!function(e){e&&(j([].concat(Object(J.a)(w),[e])),c(le({},o,{component:""})))}(t);break;case"technology":!function(e){e&&(S([].concat(Object(J.a)(C),[e])),c(le({},o,{technology:""})))}(a);break;case"environmentRequirement":!function(e){e&&(F([].concat(Object(J.a)(R),[e])),c(le({},o,{environmentRequirement:""})))}(n);break;case"customer":!function(e){e&&(L([].concat(Object(J.a)(z),[e])),c(le({},o,{customer:""})))}(r);break;default:console.log("Default case")}}if("Backspace"===e.key&&!e.target.value)switch(e.target.name){case"component":me(w.length-1);break;case"technology":pe(C.length-1);break;case"environmentRequirement":ge(R.length-1);break;case"customer":de(z.length-1);break;default:console.log("Default case")}}return r.a.createElement("div",{className:e.root},r.a.createElement("h1",{className:"create-product-header"},"Add new product"),r.a.createElement("form",{className:e.form,noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault();var t=o;t.isIdea=m,t.isClassified=v,t.technologies=C,t.components=w,t.customers=z,t.environmentRequirements=R,delete t.technology,delete t.component,delete t.environmentRequirement,delete t.customer,console.log(t);var a=new FormData;B&&a.append("image",B,B.filename),s.a.post(b+"uploadImage",a).then((function(e){console.log(e),200===e.status?(t.logo=b+e.data,s.a.post(b+"addProduct",t).then((function(e){console.log(e),ie("Product added!",{variant:"success",anchorOrigin:{vertical:"top",horizontal:"center"}})})).catch((function(e){console.log(e),ie("Product creation failed.",{variant:"error",anchorOrigin:{vertical:"top",horizontal:"center"}})}))):ie("Product creation failed.",{variant:"error",anchorOrigin:{vertical:"top",horizontal:"center"}})})).catch((function(e){console.error(e),ie("Product creation failed.",{variant:"error",anchorOrigin:{vertical:"top",horizontal:"center"}})}))}},r.a.createElement($.a,{container:!0,direction:"column",spacing:1},r.a.createElement($.a,{item:!0,xs:12,className:e.inputField},r.a.createElement(ae.a,{control:r.a.createElement(te.a,{checked:v,onChange:function(e){y(!v)}}),name:"classified",label:"Is classified",labelPlacement:"start",fullWidth:!0})),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,onKeyDown:he,value:o.name,name:"productName",label:"Name"}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,onKeyDown:he,multiline:!0,name:"shortDescription",label:"Short description",value:o.shortDescription}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(ne.a,{htmlFor:"demo-customized-select-native"},"Lifecycle status"),r.a.createElement(re.a,{id:"demo-customized-select-native",name:"lifecycleStatus",value:o.lifecycleStatus,onChange:ue},r.a.createElement(oe.a,{value:1},"(1) Idea"),r.a.createElement(oe.a,{value:2},"(2) Accepted idea"),r.a.createElement(oe.a,{value:3},"(3) Planning"),r.a.createElement(oe.a,{value:4},"(4) In developement"),r.a.createElement(oe.a,{value:5},"(5) Released"),r.a.createElement(oe.a,{value:6},"(6) In production"),r.a.createElement(oe.a,{value:7},"(7) Closed")))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{multiline:!0,onChange:ue,name:"longDescription",label:"Long description",value:o.longDescription}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,onKeyDown:he,name:"productOwner",label:"Product owner",value:o.productOwner}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,onKeyDown:he,value:o.salesPerson,name:"salesPerson",label:"Sales person"}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,onKeyDown:he,name:"businessType",label:"Business type",value:o.businessType}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,onKeyDown:he,name:"pricing",label:"Pricing",value:o.pricing}))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement("div",null,r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,name:"technology",label:"Technologies",onKeyDown:fe,value:o.technology})))),r.a.createElement($.a,{item:!0,xs:10,style:{padding:"0"}},r.a.createElement("div",{className:e.chipContainer},C.map((function(t,a){return r.a.createElement(_.a,{key:a,label:t,onDelete:function(){return pe(a)},className:e.chip})})))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement("div",null,r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,name:"component",label:"Components",onKeyDown:fe,value:o.component})))),r.a.createElement($.a,{item:!0,xs:10},r.a.createElement("div",{className:e.chipContainer},w.map((function(t,a){return r.a.createElement(_.a,{key:a,label:t,onDelete:function(){return me(a)},className:e.chip})})))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement("div",null,r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,name:"environmentRequirement",label:"Environment Requirement",onKeyDown:fe,value:o.environmentRequirement})))),r.a.createElement($.a,{item:!0,xs:10,style:{padding:"0"}},r.a.createElement("div",{className:e.chipContainer},R.map((function(t,a){return r.a.createElement(_.a,{key:a,label:t,onDelete:function(){return ge(a)},className:e.chip})})))),r.a.createElement($.a,{item:!0,xs:10,className:e.inputField},r.a.createElement("div",null,r.a.createElement(X.a,{fullWidth:!0},r.a.createElement(h.a,{onChange:ue,name:"customer",label:"Customer",onKeyDown:fe,value:o.customer})))),r.a.createElement($.a,{item:!0,xs:10},r.a.createElement("div",{className:e.chipContainer},z.map((function(t,a){return r.a.createElement(_.a,{key:a,label:t,onDelete:function(){return de(a)},className:e.chip})})))),r.a.createElement($.a,{item:!0,xs:12,className:e.imageField},r.a.createElement("h2",{className:e.logoText},"Logo",r.a.createElement(ee.a,{"aria-label":"delete",onClick:function(){ce(!Y),A(null)},className:Y?e.imgHidden:e.removeButton},r.a.createElement(Z.a,null))),r.a.createElement("input",{accept:"image/*",className:e.input,id:"contained-button-file",multiple:!0,type:"file",onChange:function(e){if(ce(!Y),e.target.files&&e.target.files[0]){var t=new FileReader;U(e.target.files[0]),t.onload=function(e){return A(e.target.result)},t.readAsDataURL(e.target.files[0])}}}),r.a.createElement("label",{htmlFor:"contained-button-file",className:Y?e.imgVisible:e.imgHidden},r.a.createElement(p.a,{variant:"contained",color:"primary",component:"span",startIcon:r.a.createElement(Q.a,null)},"Upload")),r.a.createElement("img",{className:Y?e.imgHidden:e.imgVisible,src:K,alt:""}))),r.a.createElement($.a,{item:!0,xs:12,style:{margin:"20px"}},r.a.createElement(p.a,{variant:"contained",type:"submit",style:{marginTop:"30px"}},"Submit"))))}var se=Object(d.a)((function(e){return{root:{maxWidth:"50%",margin:"60px auto",boxShadow:"1px 2px 20px 1px#d4d4d4",padding:"30px",borderRadius:"25px",backgroundColor:"white"},form:{},chip:{margin:e.spacing(.5)},chipContainer:{minHeight:"40px"},flex:{display:"flex",justifyContent:"space-around"},input:{display:"none"},logoText:{position:"relative",fontFamily:"Roboto",fontWeight:300,fontStyle:"italic",margin:"10px"},imgVisible:{maxHeight:"180px",maxWidth:"100%",margin:"auto"},imgHidden:{visibility:"Collapse",position:"absolute"},inputField:{marginTop:"10px",marginBottom:"10px",marginLeft:"10%",marginRight:"10%"},imageField:{},removeButton:{position:"absolute",right:"0px",padding:"0",marginTop:"4px"}}}));s.a.defaults.withCredentials=!0;var ue=function(){var e=Object(n.useState)({email:"",userGroup:null,name:""}),t=Object(l.a)(e,2),a=t[0],o=t[1];function c(){s.a.get(b+"session").then((function(e){var t=e.data,a=t.email,n=t.name,r=t.userGroup;a&&r&&o({email:a,name:n,userGroup:r})})).catch((function(e){console.error(e)}))}return Object(n.useEffect)((function(){c(),setInterval(c,6e4)}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(f.SnackbarProvider,{preventDuplicate:!0,maxSnack:3},r.a.createElement(u.a,null,r.a.createElement(w,{links:[{name:"Home",url:"/"},{name:"Products",url:"products"},{name:"Create product",url:"create-product"}],authorization:a,setAuthorization:o}),r.a.createElement("div",null,r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/"},r.a.createElement("div",null,r.a.createElement("p",null,"Home"))),r.a.createElement(m.a,{path:"/products"},r.a.createElement(V,null)),r.a.createElement(m.a,{path:"/create-product"},r.a.createElement(ie,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[116,1,2]]]);
//# sourceMappingURL=main.c1f661b2.chunk.js.map