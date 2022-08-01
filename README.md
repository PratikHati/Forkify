# Forkify

This is a Javascript based web application to provide recipe procedure for various snacks. Single webpage application mainly developed using ES2020-21 features.  

User Story Development-
1. Search for receipes(send request to API, pagination,display cooking time and ingredients )
2. Update number of servings to pre calculate food amount for a given number of people
3. Bookmark receipes(display bookmarked receipes)
4. Create my own receipes(Upload own receipes and will auto book marked for that user, user can only see his/her   receipes only in here)
5. Save book marked content(store bookmarked receipes in local storage i.e. cookies)

Flow Chart-
A. Search API request
B. Result and pagination(Async)
C. Display result by filter


Architecture-
1. Used Parcel for build process(bundeling, Polyfilling)
2. modules (Export(public API), Import(Dependency))



                                                       Architecture
![image](https://user-images.githubusercontent.com/104774843/174981354-486c5283-e8a8-40b1-b17c-0e00cb59ac59.png)

                                                          UI
![image](https://user-images.githubusercontent.com/104774843/174981984-48a9d587-3e6b-4779-873f-336db9c5b596.png)

                                                                            
Note- GIT LFS(Large file) support added to version control. 