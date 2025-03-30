
export interface Thumbnail {
  id: string;
  url: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface Test {
  id: string;
  videoId: string;
  videoTitle: string;
  thumbnails: Thumbnail[];
  status: 'active' | 'completed';
  startDate: string;
  endDate: string;
  remainingTime?: string;
  completedAt?: string;
  impressions: number;
  averageCTR: number;
  leadingThumbnail?: string;
  winningThumbnail?: string;
  winningCTR?: number;
  improvement?: number;
}

export const mockActiveTests: Test[] = [
  {
    id: "test_1",
    videoId: "video123",
    videoTitle: "10 JavaScript Tips Every Developer Should Know",
    thumbnails: [
      {
        id: "thumb_1_1",
        url: "https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
        impressions: 2500,
        clicks: 300,
        ctr: 12.0
      },
      {
        id: "thumb_1_2",
        url: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        impressions: 2500,
        clicks: 275,
        ctr: 11.0
      }
    ],
    status: "active",
    startDate: "2023-10-15",
    endDate: "2023-10-17",
    remainingTime: "12 hours left",
    impressions: 5000,
    averageCTR: 11.5,
    leadingThumbnail: "1"
  },
  {
    id: "test_2",
    videoId: "video456",
    videoTitle: "Build a Full Stack App with React, Node.js and MongoDB",
    thumbnails: [
      {
        id: "thumb_2_1",
        url: "https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
        impressions: 1800,
        clicks: 252,
        ctr: 14.0
      },
      {
        id: "thumb_2_2",
        url: "https://i.ytimg.com/vi/f55qeKGgB0M/maxresdefault.jpg",
        impressions: 1800,
        clicks: 270,
        ctr: 15.0
      },
      {
        id: "thumb_2_3",
        url: "https://i.ytimg.com/vi/mrHNSanmqQ4/maxresdefault.jpg",
        impressions: 1800,
        clicks: 234,
        ctr: 13.0
      }
    ],
    status: "active",
    startDate: "2023-10-14",
    endDate: "2023-10-17",
    remainingTime: "1 day left",
    impressions: 5400,
    averageCTR: 14.0,
    leadingThumbnail: "2"
  }
];

export const mockCompletedTests: Test[] = [
  {
    id: "test_3",
    videoId: "video789",
    videoTitle: "Learn Python in 1 Hour - Full Beginner's Tutorial",
    thumbnails: [
      {
        id: "thumb_3_1",
        url: "https://i.ytimg.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
        impressions: 3200,
        clicks: 416,
        ctr: 13.0
      },
      {
        id: "thumb_3_2",
        url: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
        impressions: 3200,
        clicks: 512,
        ctr: 16.0
      }
    ],
    status: "completed",
    startDate: "2023-10-01",
    endDate: "2023-10-04",
    completedAt: "Oct 4, 2023",
    impressions: 6400,
    averageCTR: 14.5,
    winningThumbnail: "2",
    winningCTR: 16.0,
    improvement: 23.1
  },
  {
    id: "test_4",
    videoId: "video101",
    videoTitle: "React Hooks Explained: useState, useEffect, useContext",
    thumbnails: [
      {
        id: "thumb_4_1",
        url: "https://i.ytimg.com/vi/O6P86uwfdR0/maxresdefault.jpg",
        impressions: 2800,
        clicks: 336,
        ctr: 12.0
      },
      {
        id: "thumb_4_2",
        url: "https://i.ytimg.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
        impressions: 2800,
        clicks: 392,
        ctr: 14.0
      },
      {
        id: "thumb_4_3",
        url: "https://i.ytimg.com/vi/9U3IhLAnSxM/maxresdefault.jpg",
        impressions: 2800,
        clicks: 448,
        ctr: 16.0
      }
    ],
    status: "completed",
    startDate: "2023-09-20",
    endDate: "2023-09-23",
    completedAt: "Sep 23, 2023",
    impressions: 8400,
    averageCTR: 14.0,
    winningThumbnail: "3",
    winningCTR: 16.0,
    improvement: 33.3
  }
];

export const getTestById = (id: string): Test | undefined => {
  return [...mockActiveTests, ...mockCompletedTests].find(test => test.id === id);
};

export const mockVideos = [
  {
    id: "vid001",
    title: "How to Master React Hooks in 10 Minutes",
    thumbnail: "https://i.ytimg.com/vi/O6P86uwfdR0/maxresdefault.jpg",
    views: 12500,
    uploadDate: "2023-09-15",
    duration: "10:45"
  },
  {
    id: "vid002",
    title: "Build a Full-Stack App with Next.js 13",
    thumbnail: "https://i.ytimg.com/vi/PQoD17_ljss/maxresdefault.jpg",
    views: 8750,
    uploadDate: "2023-09-12", 
    duration: "25:18"
  },
  {
    id: "vid003",
    title: "TypeScript Crash Course for Beginners",
    thumbnail: "https://i.ytimg.com/vi/BCg4U1FzODs/maxresdefault.jpg",
    views: 15200,
    uploadDate: "2023-09-08",
    duration: "18:32"
  },
  {
    id: "vid004",
    title: "CSS Grid Layout Tutorial: Complete Guide",
    thumbnail: "https://i.ytimg.com/vi/68O6eOGAGqA/maxresdefault.jpg",
    views: 7340,
    uploadDate: "2023-09-01",
    duration: "14:27"
  },
  {
    id: "vid005",
    title: "JavaScript Array Methods Every Developer Must Know",
    thumbnail: "https://i.ytimg.com/vi/R8rmfD9Y5-c/maxresdefault.jpg",
    views: 11800,
    uploadDate: "2023-08-25",
    duration: "12:15"
  }
];
