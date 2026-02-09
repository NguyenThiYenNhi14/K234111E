import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  // Thông tin cá nhân
  name = 'Nguyễn Thị Yến Nhi';
  mssv = 'K234111409';
  avatarImage = 'images/NHI.jpg';

  skills = [
    { category: 'Frontend', items: 'HTML, CSS, JavaScript, Angular, React' },
    { category: 'Backend', items: 'Node.js, Python, PHP, MySQL' },
    { category: 'Tools', items: 'Git, VS Code, Figma, Photoshop' },
    { category: 'Soft Skills', items: 'Làm việc nhóm, Giải quyết vấn đề' }
  ];

  experiences = [
    {
      period: '2026 - Hiện tại',
      position: 'Sinh viên',
      company: 'Đại học Kinh tế - Luật (UEL)',
      description: 'Học tập và nghiên cứu về lập trình web và công nghệ thông tin'
    }
  ];

  contact = {
    email: 'nhinty234111e@st.uel.edu.vn',
    phone: '+84 123 456 789',
    address: 'TP. Hồ Chí Minh, Việt Nam',
    mssv: 'K234111409'
  };

  social = {
    github: 'https://github.com/yennhi',
    linkedin: 'https://linkedin.com/in/yennhi',
    facebook: 'https://facebook.com/yennhi'
  };

  constructor() {
    // Constructor để khởi tạo component
  }

}