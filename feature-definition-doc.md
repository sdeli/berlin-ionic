# Features of Berlin App

## Routing

## Header
 - Back button
 - main laoder is working on all loadings

## Login Page
 - can login with username password
## Login Page
 - can register with username password

## Home/Search Page
 - can search for word in autocomplete fiels and shows dropdown with word suggestions debounced
 - searched words automatically added to 'search history'
 - search is debounced
 - on chosing word in autocomple field skeleton shows loading then word tables appear
 - in word tables lines main word is highlighted with strong tag
 - can open modal by clicking + icon at each line
 - ### Modal
   - can add a list
   - can see lists
   - can add word by clicking 'add word' button
   - can edit list name by clicking three dots icon
   - can delete list by clicking three dots icon

## WordsList Page
 - 'search history' list automaticaly created on register
 - added lists getting displayed
 - 'search history' and 'Your words' can not be deleted
 - 'Your words' is displayed if it has words in it
 - action sheet works for edit and delete
 - onclick list items take to the words stored in the list
 - Search History and Your Words appear on the top and do not have a local menu

## Words of Wordlist Page
  - can see words of wordlist
  - can delete word, if in Search History then not
  - can search in words
   - searched word is highgighted in result texts, uppercase kept
   - search state kept until user closes the site, or session storage is done

## Settings Page
 - Toggle Dark mode

## Add New Word Page
 - can add new word
 - can add to list when creating
 - to other users it doesnt appear on search page