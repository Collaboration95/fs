const listHelper = require("../utils/list_helper")

describe("total likes", () => {

    

    test("total likes with one blog", () => {
      const listWithOneBlog = [
        {
          "title": "Generic Blog Title",
          "author": "Jerome K Jerome",
          "url": "http://www.google.com",
          "likes": 5
        }
      ]
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test("total likes with two blogs", () => {
      const listWithTwoBlog = [
        {
          "title": "Title of Blog 2",
          "author": "Endi Blyton",
          "url": "http://www.google.com",
          "likes": 22
        },
        {
          "title": "Title of Blog",
          "author": "Jimmy Newtron",
          "url": "http://www.reddit.com",
          "likes": 1
        }
      ]
      const result = listHelper.totalLikes(listWithTwoBlog)
      expect(result).toBe(23)
    })

    test("total likes with no blogs", () => {
      const listWithNoBlog = []

      const result = listHelper.totalLikes(listWithNoBlog)
      expect(result).toBe(0)
    })
  })


describe("maximum likes", () => {

    test("max likes with one blog", () => {
        const listWithOneBlog = [
            {
            "title": "Generic Blog Title",
            "author": "Jerome K Jerome",
            "url": "http://www.google.com",
            "likes": 5
            }
        ]
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            "title": "Generic Blog Title",
            "author": "Jerome K Jerome",
            "url": "http://www.google.com",
            "likes": 5
            })
        })
  })

    describe("most blogs", () => {
            test("most likes from author", () => {
                const authorBlogs = [
                    {
                      "title": "Generic Blog Title 1",
                      "author": "Jerome K Jerome",
                      "url": "http://www.google.com",
                      "likes": 500
                    },
                    {
                      "title": "Generic Blog Title 2",
                      "author": "Alice Author",
                      "url": "http://www.example.com",
                      "likes": 10
                    },
                    {
                      "title": "Tech Blog 1",
                      "author": "Tech Guru",
                      "url": "http://www.techblog.com",
                      "likes": 15
                    },
                    {
                      "title": "Food Blog",
                      "author": "Food Lover",
                      "url": "http://www.foodblog.com",
                      "likes": 8
                    },
                    {
                      "title": "Travel Diary",
                      "author": "Wanderlust Explorer",
                      "url": "http://www.travelblog.com",
                      "likes": 20
                    },
                    {
                      "title": "Sports News",
                      "author": "Sports Fanatic",
                      "url": "http://www.sportsblog.com",
                      "likes": 12
                    },
                    {
                      "title": "Fashion Trends",
                      "author": "Fashionista",
                      "url": "http://www.fashionblog.com",
                      "likes": 18
                    },
                    {
                      "title": "Music Vibes",
                      "author": "Music Enthusiast",
                      "url": "http://www.musicblog.com",
                      "likes": 25
                    },
                    {
                      "title": "Movie Reviews",
                      "author": "Movie Buff",
                      "url": "http://www.movieblog.com",
                      "likes": 7
                    },
                    {
                      "title": "Science Wonders",
                      "author": "Science Geek",
                      "url": "http://www.scienceblog.com",
                      "likes": 14
                    }
                  ]
                const result = listHelper.mostLikes(authorBlogs)
                expect(result).toEqual("Jerome K Jerome")
                })


                test("Author with most Blogs", () => {
                    const authorBlogs = [
                        {
                          "title": "Generic Blog Title 1",
                          "author": "Jerome K Jerome",
                          "url": "http://www.google.com",
                          "likes": 500
                        },
                        {
                          "title": "Generic Blog Title 2",
                          "author": "Tech Guru",
                          "url": "http://www.example.com",
                          "likes": 10
                        },
                        {
                          "title": "Tech Blog 1",
                          "author": "Tech Guru",
                          "url": "http://www.techblog.com",
                          "likes": 15
                        },
                        {
                          "title": "Food Blog",
                          "author": "Tech Guru",
                          "url": "http://www.foodblog.com",
                          "likes": 8
                        },
                        {
                          "title": "Travel Diary",
                          "author": "Tech Guru",
                          "url": "http://www.travelblog.com",
                          "likes": 20
                        },
                        {
                          "title": "Sports News",
                          "author": "Sports Fanatic",
                          "url": "http://www.sportsblog.com",
                          "likes": 12
                        },
                        {
                          "title": "Fashion Trends",
                          "author": "Fashionista",
                          "url": "http://www.fashionblog.com",
                          "likes": 18
                        },
                        {
                          "title": "Music Vibes",
                          "author": "Music Enthusiast",
                          "url": "http://www.musicblog.com",
                          "likes": 25
                        },
                        {
                          "title": "Movie Reviews",
                          "author": "Movie Buff",
                          "url": "http://www.movieblog.com",
                          "likes": 7
                        },
                        {
                          "title": "Science Wonders",
                          "author": "Science Geek",
                          "url": "http://www.scienceblog.com",
                          "likes": 14
                        }
                      ]
                    const result = listHelper.mostBlogs(authorBlogs)
                    expect(result).toEqual("Tech Guru")
                    })
        })