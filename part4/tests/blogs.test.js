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