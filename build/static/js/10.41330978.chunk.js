webpackJsonp([10],{528:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n.n(a),o=n(548),i=(n.n(o),n(48)),l=n(47),s=n(74),c=(n.n(s),n(555)),u=n(553),m=n(549),p=n(550),d=n(552),h=n(554),f=n.n(h),y=n(551),v=n.n(y),b=n(561),g=n.n(b),C=n(204),E=n(562),w=n(575),I=n.n(w),S=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},_=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function a(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),j=this&&this.__decorate||function(e,t,n,a){var r,o=arguments.length,i=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(o<3?r(i):o>3?r(t,n,i):r(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i},O=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},P=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))(function(r,o){function i(e){try{s(a.next(e))}catch(e){o(e)}}function l(e){try{s(a.throw(e))}catch(e){o(e)}}function s(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(i,l)}s((a=a.apply(e,t||[])).next())})},T=this&&this.__generator||function(e,t){function n(e){return function(t){return a([e,t])}}function a(n){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,o&&(i=2&n[0]?o.return:n[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,n[1])).done)return i;switch(o=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,o=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(i=s.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){s.label=n[1];break}if(6===n[0]&&s.label<i[1]){s.label=i[1],i=n;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(n);break}i[2]&&s.ops.pop(),s.trys.pop();continue}n=t.call(e,s)}catch(e){n=[6,e],o=0}finally{r=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var r,o,i,l,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return l={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l},k=Object(i.b)(v.a)(R||(R=S(["margin-left: 1em;"],["margin-left: 1em;"]))),x=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.value="u116115",t.items='\n  [\n  {\n    "id": "1",\n    "order": 0,\n    "name": "Test",\n    "groups": [\n      {\n        "id": "1",\n        "name": "分组1",\n        "order": 0,\n        "children": [\n          {\n            "id": "1",\n            "name": "用户1",\n            "order": 0,\n            "subtitle": "开发工程师"\n          },\n          {\n            "id": "2",\n            "name": "用户2",\n            "order": 1,\n            "subtitle": "开发工程师3"\n          }\n        ]\n      }\n    ]\n  }\n]\n  ',t.onlyShowItems=!1,t.selectedContact=[],t.handleChange=function(e){t.value=e.target.value},t.handleTenementIdChange=function(e){t.tenementId=e.target.value},t.saveTenement=function(){Object(E.c)({tenementId:t.tenementId})},t.validateItems=function(){var e=t.items;try{t.itemsError=void 0;var n=JSON.parse(e),a=JSON.stringify(n,void 0,"  ");t.items=a,Object(E.c)({items:I.a.compressToBase64(a)})}catch(n){t.itemsError=n,t.items=e}},t.handleItemsChange=function(e){var n=e.target.value;t.items=n},t.showContact=function(){Object(C.f)().showContact(t.value)},t.openContactSelector=function(){return P(t,void 0,void 0,function(){var e,t;return T(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,Object(C.f)().selectContact({user:[],type:"multiple",limit:20,tenementId:this.tenementId,items:JSON.parse(this.items),onlyShowItems:this.onlyShowItems})];case 1:return e=n.sent(),this.selectedContact.replace(e),[3,3];case 2:return t=n.sent(),console.log(t),[3,3];case 3:return[2]}})})},t}return _(t,e),t.prototype.componentWillMount=function(){var e=Object(E.a)();this.tenementId=e.tenementId,this.items=e.items?I.a.decompressFromBase64(e.items):this.items},t.prototype.render=function(){var e=this;return r.a.createElement("div",{className:this.props.className},r.a.createElement(o.Helmet,null,r.a.createElement("title",null,"联系人")),r.a.createElement(m.a,null,"打开名片",r.a.createElement(d.a,{android:!0,ios:!0,pc:!0})),r.a.createElement(p.a,null,r.a.createElement(f.a,{hintText:"输入用户id",value:this.value,onChange:this.handleChange}),r.a.createElement(k,{label:"打开",onClick:this.showContact})),r.a.createElement(p.a,null,r.a.createElement(m.a,null,"示例代码"),r.a.createElement(u.a,null,"\nimport Api from '@gdjiami/gzb-jssdk'\nconst api = Api()\napi.openContact(userId)\n          ")),r.a.createElement(m.a,null,"联系人选择器",r.a.createElement(d.a,{android:!0,ios:!0,pc:!0})),r.a.createElement(p.a,null,r.a.createElement(f.a,{hintText:"输入tenementId",value:this.tenementId,onChange:this.handleTenementIdChange,onBlur:this.saveTenement}),r.a.createElement("br",null),r.a.createElement(f.a,{hintText:"输入items(可以在PC端编辑，然后复制链接到客户端调试)",value:this.items,onChange:this.handleItemsChange,onBlur:this.validateItems,multiLine:!0,rows:8,style:{width:"100%"},errorText:this.itemsError?this.itemsError.message:void 0}),r.a.createElement(g.a,{label:"只显示自定义组织items",toggled:this.onlyShowItems,onToggle:function(t,n){e.onlyShowItems=n}}),r.a.createElement("br",null),r.a.createElement(k,{label:"打开",onClick:this.openContactSelector}),r.a.createElement("p",null,r.a.createElement("ul",null,this.selectedContact.map(function(e){return r.a.createElement("li",{key:e.id},e.id,": ",e.name)})))),r.a.createElement(p.a,null,r.a.createElement(m.a,null,"示例代码"),r.a.createElement(u.a,null,"\nimport Api from '@gdjiami/gzb-jssdk'\nconst api = Api()\nasync function selectContact() {\n  try {\n    const data = await api().selectContact({\n      user: [],\n      type: 'multiple',\n      limit: 20,\n      tenementId: 't140050483060650196',\n    })\n    console.log(data[0].name)\n  } catch(err) {\n    console.log(err)\n  }\n}\n          ")),r.a.createElement(p.a,null,r.a.createElement(m.a,null,"文档"),r.a.createElement(c.a,null,"\n### openContact\n► **openContact**(id: *`string`*): `void`\n**Parameters:**\n\n| Param | Type | Description |\n| ------ | ------ | ------ |\n| id | `string`   |  用户id |\n\n**Returns:** `void`\n\n---\n\n###  selectContact\n► **selectContact**(params: *SelectContactParams*): `Promise`.<SelectContactResponse>\n**Parameters:**\n\n| Param | Type | Description |\n| ------ | ------ | ------ |\n| params | SelectContactParams  |  - |\n\n**Returns:** `Promise`.<SelectContactResponse>\n\n---\n\n### 相关类型定义\n\n```typescript\nexport interface SelectContactParams {\n  /**\n   * 已选中联系人信息\n   */\n  user?: Array<{\n    id: string\n    name: string\n  }>\n  /**\n   * 企业id\n   */\n  tenementId: string\n  /**\n   * 限制数，只有在type为multple时有效\n   */\n  limit?: number\n  /**\n   * 是否可以取消选择\n   */\n  unselect?: boolean\n  /**\n   * 选择类型\n   */\n  type?: 'single' | 'multiple'\n}\n\ntype SelectContactResponse = Array<{\n  id: string\n  name: string\n  avatar: string\n}>\n```\n          ")))},j([l.observable,O("design:type",String)],t.prototype,"value",void 0),j([l.observable,O("design:type",String)],t.prototype,"tenementId",void 0),j([l.observable,O("design:type",String)],t.prototype,"items",void 0),j([l.observable,O("design:type",Boolean)],t.prototype,"onlyShowItems",void 0),j([l.observable,O("design:type",Error)],t.prototype,"itemsError",void 0),j([l.observable,O("design:type",Array)],t.prototype,"selectedContact",void 0),t=j([s.observer],t)}(r.a.Component);t.default=x;var R}});
//# sourceMappingURL=10.41330978.chunk.js.map