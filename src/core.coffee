# ZeroFixFramework
# Module: Core
# Version: v0.1.0
# Copylight: VoQn
# License: MIT

# Utilities of list iterator
is_list = ( xs ) ->
  for klass in [ Array, NodeList, HTMLCollection ]
    if xs instanceof klass
      return yes
  no

is_empty = ( xs ) ->
  for _ of xs
    return no
  yes

# Higher order functions
map = ( xs, f ) ->
  if is_list xs
    f( x, i ) for x, i in xs
  else
    r = {}
    for k, v of xs
      r[ k ] = f v, k
    r

each = ( xs, f ) ->
  if is_list xs
    f( x, i ) for x, i in xs
  else
    for k, v of xs
      f v, k
  return

dry_run = ( f ) ->
  try
    f()
  catch e
    console.log "Exception occurred #{e}"
    return

# DOM finder
find_dom = ( query ) ->
  if query.match /^#[0-9a-zA-Z_\-]+\s?$/
    document.getElementById query.substring 1
  else
    dom = document.querySelectorAll query
    if dom.length is 1 then dom[ 0 ] else dom

# Event Utilities
add_on_load = ( callback )->
  reserved = window.onload
  if typeof reserved is 'function'
    window.onload = () ->
      dry_run reserved
      dry_run callback
      return
  else
    window.onload = callback
  return

add_event = ( element, type, callback, capture ) ->
  if element.addEventListener?
    element.addEventListener type, callback, capture
  else
    element[ "on#{ type }" ] = callback
  return

# Styling page by User's Stylesheet Object ( like json )
styling = ( stylesheet ) ->
  dom = document.createElement 'style'
  res = '\n'
  for selector, declarations of stylesheet
    res += "#{ selector } {\n"
    for property, value of declarations
      res += "  #{ property }: #{ value } !important;\n"
    res += "}\n\n"
  dom.innerHTML = res
  document.getElementsByTagName('head')[0].appendChild dom
  return

# Fix watch page
fix_page = ( stylesheet = {}, restructor ) ->
  if restructor?
    restructor()
  unless is_empty stylesheet
    styling stylesheet
  return

# Reservation for restruct watch page
reserve = () ->
  run_fix = () ->
    conf = zero_fix.get_conf()
    unless is_empty conf
      fix_page conf.stylesheet, conf.restruct
    return
  add_on_load () ->
    run_fix()
    return
  return

# Framework Object
zero_fix =
  # Place holder for User Stylesheet & Restruction Callback
  user_conf   : {}
  get_conf    : () -> @user_conf
  set_conf    : ( conf ) -> @user_conf = conf; @
  # List Utilities
  is_empty    : is_empty
  is_list     : is_list
  map         : map
  each        : each
  # DOM Finder
  find_dom    : find_dom
  # Event Utilities
  add_on_load : add_on_load
  add_event   : add_event
  # Fixer watch page
  styling     : styling
  fix_page    : fix_page
  # Reservation
  reserve     : reserve

window.zero_fix = zero_fix
window.zero_fix.reserve()
# EOF
