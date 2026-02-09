import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- THUẬT TOÁN TÍNH ÂM LỊCH (Giữ nguyên class LunarCalendar) ---
class LunarCalendar {
  static jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }
    return jd;
  }
  
  // ... (Giữ nguyên các hàm getNewMoonDay, getSunLongitude, getLunarMonth11, getLeapMonthOffset...)
  static getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  }

  static getSunLongitude(jdn: number, timeZone: number): number {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - Math.PI * 2 * (Math.floor(L / (Math.PI * 2)));
    return Math.floor(L / Math.PI * 6);
  }

  static getLunarMonth11(yy: number, timeZone: number): number {
    const off = this.jdFromDate(31, 12, yy) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = this.getNewMoonDay(k, timeZone);
    const sunLong = this.getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = this.getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  static getLeapMonthOffset(a11: number, timeZone: number): number {
    const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  static convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number): [number, number, number, number] {
    const dayNumber = this.jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = this.getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, timeZone);
    }
    let a11 = this.getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = this.getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = this.getLunarMonth11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  }
}

@Component({
  selector: 'app-ex10',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ex10.html',
  styleUrl: './ex10.css'
})
export class Ex10 {
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay: number = 1;
  selectedMonth: number = 1;
  selectedYear: number = 2024;

  result: any = null;

  constructor() {
    this.days = Array.from({length: 31}, (_, i) => i + 1);
    this.months = Array.from({length: 12}, (_, i) => i + 1);
    this.years = Array.from({length: 150}, (_, i) => 1900 + i);

    const today = new Date();
    this.selectedDay = today.getDate();
    this.selectedMonth = today.getMonth() + 1;
    this.selectedYear = today.getFullYear();
  }

  convert() {
    const dd = Number(this.selectedDay);
    const mm = Number(this.selectedMonth);
    const yy = Number(this.selectedYear);

    // 1. Tính thứ
    const date = new Date(yy, mm - 1, dd);
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // 2. Tính số liệu âm lịch
    const timeZone = 7;
    const [lunarDay, lunarMonth, lunarYear, lunarLeap] = LunarCalendar.convertSolar2Lunar(dd, mm, yy, timeZone);

    // Mảng Can Chi
    const cans = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
    const chis = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];

    // --- A. NĂM ---
    const yearCanIndex = lunarYear % 10;
    const yearChiIndex = lunarYear % 12;
    const namAmText = `Năm ${cans[yearCanIndex]} ${chis[yearChiIndex]}`;

    // --- B. THÁNG ---
    const monthCanStart = (yearCanIndex * 2 + 8) % 10;
    const monthCanIndex = (monthCanStart + lunarMonth - 1) % 10;
    const monthChiIndex = (lunarMonth + 5) % 12;
    
    let thangAmText = `${cans[monthCanIndex]} ${chis[monthChiIndex]}`;
    if (lunarLeap) {
      thangAmText += ` (Nhuận)`;
    }

    // --- C. NGÀY (Đã hiệu chỉnh lại offset) ---
    const jd = LunarCalendar.jdFromDate(dd, mm, yy);
    // Lưu ý: Offset này để khớp với ngày Giáp Tý (01/01/2024)
    // Mảng cans bắt đầu từ Canh(0), mảng chis bắt đầu từ Thân(0)
    const dayCanIndex = (jd + 3) % 10; 
    const dayChiIndex = (jd + 5) % 12;
    const ngayAmText = `${cans[dayCanIndex]} ${chis[dayChiIndex]}`;

    const amLichFull = lunarLeap 
      ? `${lunarDay}/${lunarMonth} (nhuận)/${lunarYear}` 
      : `${lunarDay}/${lunarMonth}/${lunarYear}`;

    this.result = {
      thu: dayOfWeek,
      duongLich: `${dd}/${mm}/${yy}`,
      amLich: amLichFull,
      namAm: namAmText,
      thangAm: `Tháng ${thangAmText}`,
      ngayAm: `Ngày ${ngayAmText}`
    };
  }
}