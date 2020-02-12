webpackJsonp([17],{537:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n.n(r),l=n(74),o=(n.n(l),n(548)),i=(n.n(o),n(47)),c=n(553),u=n(555),s=n(549),p=n(550),f=n(552),m=n(554),d=n.n(m),v=n(551),h=n.n(v),y=n(204),b=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),g=this&&this.__decorate||function(e,t,n,r){var a,l=arguments.length,o=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(o=(l<3?a(o):l>3?a(t,n,o):a(t,n))||o);return l>3&&o&&Object.defineProperty(t,n,o),o},_=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.value="",t.res="",t.handleChange=function(e){t.value=e.target.value},t.open=function(){var e={url:t.value};console.log("openFile 请求参数",e),Object(y.f)().setUpBridge(function(n){n.callHandler("openFile",e,function(e){t.res=e,console.log("openFile 响应参数",e)})})},t}return b(t,e),t.prototype.render=function(){return a.a.createElement("div",{className:this.props.className},a.a.createElement(o.Helmet,null,a.a.createElement("title",null,"setTitle")),a.a.createElement(s.a,null,"打开文件(openFile) ",a.a.createElement(f.a,{pc:!0})),a.a.createElement(p.a,null,a.a.createElement(d.a,{hintText:"输入文件url",value:this.value,onChange:this.handleChange}),a.a.createElement("br",null),"示例代码",a.a.createElement(c.a,null,"\nimport Api from '@gdjiami/gzb-jssdk'\nconst api = Api()\napi.openFile('"+this.value+"')\n"),a.a.createElement("br",null),a.a.createElement(h.a,{label:"打开",onClick:this.open}),a.a.createElement("br",null)),a.a.createElement(p.a,null,a.a.createElement(s.a,null,"文档"),a.a.createElement(u.a,null,"\n###  openFile\n\n► **openFile**(url: *`string`*): `Promise`<`void`>\n打开指定文件\n\n**Parameters:**\n\n| Param | Type | Description |\n| ------ | ------ | ------ |\n| url | `string`   |  文件url |\n\n**Returns:** `Promise`<`void`>\n            ")))},g([i.observable,_("design:type",String)],t.prototype,"value",void 0),g([i.observable,_("design:type",String)],t.prototype,"res",void 0),t=g([l.observer],t)}(a.a.Component);t.default=E}});
//# sourceMappingURL=17.a249abcc.chunk.js.map