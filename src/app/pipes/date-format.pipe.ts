import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: string): unknown {
    let dateNow: any = new Date();
    const dateCreate: any = new Date(date);
    const diffMinute = Math.floor((dateNow - dateCreate) / 60000);
    const diffHour = Math.floor(diffMinute / 60);
    const diffDay = Math.floor(diffMinute / 1440);

    if (diffMinute <= 0) {
      return 'Vừa xong';
    } else if (diffMinute < 60) {
      return diffMinute + ' phút';
    } else if (diffHour >= 1 && diffHour <= 24) {
      return diffHour + ' giờ';
    } else if (diffDay >= 1 && diffDay <= 3) {
      return diffDay + ' ngày';
    } else {
      return (
        (dateCreate.getDate()) +
        ' tháng ' +
        (dateCreate.getMonth() + 1) +
        ', ' +
        dateCreate.getFullYear()
      );
    }
  }

}
