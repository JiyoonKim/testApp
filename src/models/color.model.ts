//
//	Space color control을 위한 color model
//
//	Page에 space color를 입히는 법
//
//	.ts file
//	1. import
//		import { ColorModel } from '../../models/color.model';
//	2. define data
//		private color: ColorModel;
//	3. space color 지정  (constructor나 ngOnInit등에서)
//		this.color = new ColorModel(this.space.color);		// this.space가 설정 되어 있어야 한다.
//
//	.html file
//	navbar의 경우 <ion-navbar [color]="color.navbarColor()">로 color를 지정한다. (이경우, theme의 variable.scss에서 color지정이 된것이다.)
//	toolbar의 경우도 <ion-toolbar [color]="color.toolbarColor()">로 color를 지정한다.
//	content body의 경우에는 color로 설정을 할 수 없다. 그래서 class로 define한다. <ion-content class="{{color.contentColor()}}">
//		class의 경우에는 app.scss에서 theme의 variable.scss와 동일하게 이름을 설정해야 한다.
//
export class ColorModel {
	constructor(public colorTemplate: string) {
	}

	change(color) { this.colorTemplate = color; }

	navbarColor() { return (this.colorTemplate === 'default' ? 'defaultheader' : this.colorTemplate); }

	toolbarColor() { return (this.colorTemplate === 'default' ? 'defaultcontent' : this.colorTemplate); }

	contentColor() { return (this.colorTemplate === 'default' ? 'defaultcontent' : this.colorTemplate ); }

	defaultBackgroundColor() { return (this.colorTemplate === 'default' ? 'defaultbackground' : this.colorTemplate); }

    whiteBackgroundColor() { return (this.colorTemplate === 'default' ? 'whitebackground' : this.colorTemplate); }
}
