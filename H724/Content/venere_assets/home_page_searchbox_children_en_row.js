/* $LastChangedRevision$
from search_widget_calendars_js_jquery.tpl r49135 
*/
var SWConfig = new Object();
var sw_config = {"room_min":1,"room_max":9,"room_default":1,"adult_min":1,"adult_max":10,"adult_default":2,"child_min":0,"child_max":6,"child_default":0,"infant_min_age":2,"rgval_regexp":"^(10?|[2-9])(\\|(10?|[2-9])){0,8}\\|\\|(-1|(1[0-7]?|[02-9])(_(1[0-7]?|[02-9])){0,5})(\\|(-1|(1[0-7]?|[02-9])(_(1[0-7]?|[02-9])){0,5})){0,8}$","rgval_array_sep_char":"||","rgval_room_sep_char":"|","rgval_child_age_sep_char":"_","rgval_child_age_empty_char":"-1","rgval_default_value":"2||-1"};
var search_with_children = true;
function InitSWConfig()    {
if(typeof(SWConfig.inited) != 'undefined' && SWConfig.inited){
return;    
}
SWConfig.useCurrentUrlAsAction = false;
SWConfig.currentDateFormat = 'dd/mm/yyyy';
SWConfig.toolboxDateFormat = SWConfig.currentDateFormat.replace('mm','MM');
SWConfig.dateInputLabel = 'dd/mm/yyyy';
SWConfig.searchWithChildren = search_with_children;
SWConfig.rgvalRegexp = sw_config['rgval_regexp'];
SWConfig.rgvalDefaultValue = sw_config['rgval_default_value'];      
SWConfig.rgvalRoomSepChar = sw_config['rgval_room_sep_char'];
SWConfig.rgvalArraySepChar = sw_config['rgval_array_sep_char'];
SWConfig.rgvalChildAgeSepChar = sw_config['rgval_child_age_sep_char'];
SWConfig.rgvalChildAgeEmptyChar = sw_config['rgval_child_age_empty_char'];
SWConfig.MIN_CHECKIN_ALLOWED_OFFSET   = 0;
SWConfig.MIN_CHECKOUT_ALLOWED_OFFSET  = 1;
SWConfig.MAX_CHECKIN_ALLOWED_OFFSET   = 395;
SWConfig.MAX_CHECKOUT_ALLOWED_OFFSET  = 396;
SWConfig.MAX_STAY_LENGTH_ALLOWED      = 28;
SWConfig.hasDestination = true;
SWConfig.destinationDefaultText = 'Rome, Paris, New York...';
SWConfig.formDao = new HomeSearchFormDAO(document.getElementById('vSearch'));
SWConfig.performAction = new HomePageSearchBoxAction();
SWConfig.errorAction = new NotifyErrorAction();
SWConfig.allowedUrlParameters = {htid:1,lg:1,sd:1,sm:1,sy:1,ed:1,em:1,ey:1,pval:1,rval:1,rgval:1,ref:1,device_type:1,ta_op:1,cc_op:1,flush_cache:1,adm:1,demoreservation:1,is_domain_ref:1,no_discount:1};
NotifyErrorAction.prototype.errorsMsg = {INVALID_CHECKIN_DATE: 'Your check-in date is invalid',INVALID_CHECKOUT_DATE: 'Your check-out date is invalid',CHECKIN_LESS_THAN_TODAY: 'Your arrival date cannot be earlier than today',CHECKOUT_LESS_THAN_CHECKIN: 'Your arrival date must precede your departure date',DESTINATION_EMPTY: 'Please enter a destination before continuing with your search',PERSONS_EMPTY: 'Please enter the total number of guests',ROOMS_EMPTY: 'Please specify the total number of rooms required',PERSONS_LESS_THAN_ROOMS: 'The number of guests cannot be less than the number of rooms'};
var psDAO = new PreSetDAO(SWConfig);
var context = jQuery.getContext();
context.model.avlsrc_site_label = {"room_singular":"room","room_singular_short":"room","room_plural":"rooms","room_plural_short":"rooms","child_none":"children","child_singular":"child","child_singular_short":"child","child_plural":"children","child_plural_short":"children","adult_singular":"adult","adult_singular_short":"adult","adult_plural":"adults","adult_plural_short":"adults","child_age":"Age of child at check-in:","children_ages":"Age of children at check-in:","child_age_unfilled":"?","child_age_infant":"<1","child_age_range":"(0-17 years)","children_age_tooltip":"Age of children at check-in:","adult_dropdown":"%adult_num% %adult_short%","child_dropdown":"%child_num% %child_short%","room_dropdown":"%room_num% %room_short%","guests_option":"(%adult_num% %adult%, %child_num% %child%)","selected_room":"","input_room":"Room %room_num%"};
/* --- SEARCH WIDGET CHILDREN CONFIG --- */
var sw_rooms = [];
var useOverlay = false;
//TODO (when project is definetely online): remove all cases where useOverlay is meant to be true
var lockNextScroll = false;
var searchWidgetSelectors = [];
$('.searchwidget').each(function(i,e){
searchWidgetSelectors.push('#'+$(e).attr('id'));
});
for(var s=0;s< searchWidgetSelectors.length;s++){
SWCSetup(searchWidgetSelectors[s]);
}
/* --- EVENTS --- */
if(isIPad()){
$('.sw_background_modal').bind('touchstart',function(e){
hideModal(parentSearchSelector($(this)));
});
}
// this event is triggered by SearchFormDAO.prototype.setRoomGuest in SearchWidgetNoFrm.js
$('.rgval').bind('cookieChanged',function(e,rgStr){
var sws = parentSearchSelector($(e.target));
setRoomsData(sws,rgStr);
});
$('#city-clear').click(function(e){
$('#city').focus().val('');
});
$('.pr_val_fake').focus(function(e){
showModal(parentSearchSelector($(this)));
});
if(useOverlay){
$('.pr_val_textfield').click(function(e){
showModal(parentSearchSelector($(this)));
});
$('.sw_close_modal, .sw_accept_modal, .sw_background_modal').click(function(e){
hideModal(parentSearchSelector($(this)));
});
}else{
$(document).unbind('click.swc').bind('click.swc',modalShowHideEvent);
$('.sw_accept_modal').unbind('click.swc').bind('click.swc',function(e){
var sws = parentSearchSelector($(this));
var $find = $(sws).find('form').find('input[type=submit]');
if(hideModal(sws)) $find.focus();
});
}
$('.sw_accept_modal').unbind('keydown.swc').bind('keydown.swc',function(e){
if(e.keyCode==9 && !e.shiftKey){
return false;
}
});
$('.pr_val_container')
.off('.swc')
.on('change.swc keyup.swc keydown.swc', '.cval', childrenSelectChange)
.on('change.swc keyup.swc keydown.swc', '.pval', adultSelectChange)
.on('change.swc keyup.swc keydown.swc', '.rnum', roomSelectChange)
.on('change.swc keyup.swc keydown.swc', '.ageval', ageSelectChange)
.on('click.swc', '.ageval option', function(){$(this).parent().trigger('change.swc');})
.on('focus.swc', '.cval, .pval, .rnum, .ageval', selectFocus)
.on('blur.swc', '.cval, .pval, .rnum, .ageval', selectBlur);
function updateEvents() {
$('.cval').trigger('change.swc');
$('.pval').trigger('change.swc');
$('.rnum').trigger('change.swc');
//$('.ageval').trigger('change.swc');
// will bind focus and blur events on all selects inside div#searchbox (only for responsive)
ctrl.SWUpdateSelectEventResponsive();
}
updateEvents();
/*
* document's click event (used only if useOverlay===false)
*/
function modalShowHideEvent(e){
var $t = $(e.target);
var sws = parentSearchSelector($t);
var isopen = isSearchboxOpen(sws);
if(!isopen && shouldOpenModal($t)){
showModal(sws);
}
else if(isopen && shouldCloseModal($t)){
if(shouldRestoreDefault($t)){
closeAllAndRestoreDefaults();
}
hideModal(sws);
}
}
/*
* methods returning Booleans for document's click event (modalShowHideEvent)
*/
function shouldOpenModal($target){
return Boolean(
$target.is('.pr_val_textfield') ||
$target.parents('.pr_val_textfield').length===1
);
}
function shouldCloseModal($target){
return Boolean(
$target.is('.sw_close_modal') ||
$target.is('.sw_close_modal span') ||
$target.parents('.pr_val_modal').length===0
);
}
function shouldRestoreDefault($target){
return Boolean(
$target.is('a') ||
$target.parents('a').length===1 ||
$target.parents('#currency').length===1 ||
$target.parents('#read-full-description').length===1
);
}
/* --- INTERNAL METHODS --- */
/*
* setup the Searchform With Children
*/
function SWCSetup(sws) {
addRoomSelect(sws);
var rgvalDefault = psDAO.getRoomGuest();
if(!rgvalDefault || rgvalDefault==''){
addRooms(sws, sw_config['room_min']);
} else {
setRoomsData(sws);
}
updateRoomsObject(sws);
}
/*
* restore searchbox defaults from cookie
*/
function restoreRoomsGuestsDefault(sws){
setRoomsData(sws);
updateEvents();
lockNextScroll = true;
}
/*
* restore all searchbox defaults from cookie and close them
*/
function closeAllAndRestoreDefaults(){
var sws,swOpened = searchWidgetsOpened();
for(var i=0;i< swOpened.length;i++){
sws = swOpened[i];
restoreRoomsGuestsDefault(sws);
hideModal(sws);
}
}
/*
* restore other searchboxes defaults from cookie and close them (if any)
*/
function restoreRoomsGuestsDefaultOtherThan(sws){
if(!sws || sws==='') closeAllAndRestoreDefaults();
var other;
for(var i=0;i< swOpened.length;i++){
other = swOpened[i];
if(sws!==other){
restoreRoomsGuestsDefault(other);
hideModal(other);
}
}
}
/*
* set rooms data from existing cookie
*/
function setRoomsData(sws,rgStr) {
var rgvalDefault = psDAO.getRoomGuest();
var rgval_value = rgStr?rgStr:rgvalDefault;
var rgval_array = rgval_value.split(SWConfig.rgvalArraySepChar);
var adult_array = getAdultsFromCookie(rgval_array[0]);
var child_array = getChildrenFromCookie(rgval_array[1]);
if(adult_array.length!=child_array.length) return false; // error occurred
var rooms_total = adult_array.length;
updateRooms(sws, rooms_total);
var $selRoom,$selAdult,$selChild,$selAge;
$selRoom = $(sws+' .rnum');
$selRoom.val(rooms_total);
roomSelectChange({target:$selRoom,sws:sws});
var roomid;
for(var r=0; r < rooms_total; r++){
roomid = r+1;
$selAdult = $(sws+' .pval_r'+roomid);
$selAdult.val(adult_array[r]);
adultSelectChange({target:$selAdult,sws:sws});
$selChild = $(sws+' .cval_r'+roomid);
$selChild.val(child_array[r].length);
if($selChild.length>0){
childrenSelectChange({target:$selChild,sws:sws});
}
for(var c=0; c < child_array[r].length; c++){
$selAge = $(sws+' .ageval_r'+roomid+'_'+(c+1));
$selAge.val(child_array[r][c]);
ageSelectChange({target:$selAge,sws:sws});
}
}
//$('.ageval').trigger('change.swc');
//updateEvents();
}
function rgvalToString(rgval){
var rooms_array = parseRGVal(rgval);
return roomsArrayToString(rooms_array,'strong');
}
function parseRGVal(rgval){
var rgArray = rgval.split(SWConfig.rgvalArraySepChar);
var adult_array = getAdultsFromCookie(rgArray[0]);
var child_array = getChildrenFromCookie(rgArray[1]);
var rooms_total = adult_array.length;
var room_obj,rooms_array = [];
for(var r=0;r< rooms_total;r++){
room_obj = {adults:adult_array[r],children:[]};
for(var c=0;c< child_array[r].length;c++){
room_obj.children.push(child_array[r][c]);
}
rooms_array.push(room_obj);
}
return rooms_array;
}
function getAdultsFromCookie(adults_string){
var adult_array = adults_string.split(SWConfig.rgvalRoomSepChar);
return adult_array;
}
function getChildrenFromCookie(children_string){
var child_array = children_string.split(SWConfig.rgvalRoomSepChar);
var children_array = [];
for(var c=0; c < child_array.length; c++){
if(child_array[c]==SWConfig.rgvalChildAgeEmptyChar){
children_array.push([]);
} else {
children_array.push(child_array[c].split(SWConfig.rgvalChildAgeSepChar));
}
}
return children_array;
}
/*
* get rooms data and update sw_rooms array (called only by updateRoomsObject)
*/
function getRoomsData(sws) {
sw_rooms = [];
var room_obj,room,rooms = $(sws+' .sw-room').length;
for(var r=0;r < rooms;r++){
room = $(sws+' .sw-room-'+(r+1));
room_obj = {
adults   : $(room).find('.pval').val(),
children : []
};
$(room).find('.sw-children .ageval_container').each(function(e,i){
if($(this).css('display')!='none') {
room_obj.children.push($(this).find('.ageval').val());
}
});
sw_rooms.push(room_obj);
}
}
/*
* convert sw_rooms array into rooms_guest_group string format
*/
function roomsDataString() {
var rAdults = [],
rChilds = [];                
for(var r=0; r < sw_rooms.length; r++) {
rAdults.push(sw_rooms[r].adults);
if(sw_rooms[r].children.length>0){
rChilds.push(sw_rooms[r].children.join(SWConfig.rgvalChildAgeSepChar));
} else {
rChilds.push(SWConfig.rgvalChildAgeEmptyChar);
}
}
var rString = rAdults.join(SWConfig.rgvalRoomSepChar) + SWConfig.rgvalArraySepChar + rChilds.join(SWConfig.rgvalRoomSepChar);
return rString;
}
/*
* updates the room object and displays the updated summary string
*/
function updateRoomsObject(sws) {
// updates sw_rooms array
getRoomsData(sws);
var resultString = roomsArrayToString(sw_rooms,null,'span')
$(sws+' .pr_val_textfield').html('<p>' + resultString + '</p><span/>');
$(sws+' .rgval').val(roomsDataString());
}
function roomsArrayToString(rooms_array,roomsDomContainer,guestsDomContainer){
var rooms = rooms_array.length;
var adults = 0;
var children = 0;
for(var r=0;r< rooms_array.length;r++) {
adults += Number(rooms_array[r].adults);
children += rooms_array[r].children.length;
}
var st_rooms = context.model.avlsrc_site_label.room_dropdown;
st_rooms = st_rooms.replace('%room_num%',rooms);
st_rooms = st_rooms.replace('%room_short%',context.model.avlsrc_site_label['room_'+(rooms==1?'singular':'plural')]);
var st_guests = context.model.avlsrc_site_label.guests_option;
st_guests = st_guests.replace('%adult_num%',adults);
st_guests = st_guests.replace('%child_num%',children);
st_guests = st_guests.replace('%adult%',context.model.avlsrc_site_label['adult_'+(adults==1?'singular':'plural')]);
st_guests = st_guests.replace('%child%',context.model.avlsrc_site_label['child_'+(children==1?'singular':'plural')]);
var resultString = [];
resultString.push((roomsDomContainer?'<'+roomsDomContainer+'>':'')+st_rooms+(roomsDomContainer?'</'+roomsDomContainer+'>':''));
resultString.push((guestsDomContainer?'<'+guestsDomContainer+'>':'')+st_guests+(guestsDomContainer?'</'+guestsDomContainer+'>':''));
return resultString.join(' ');
}
/*
* check age values for all children selected
*/
function checkChildrenAges(sws,doNotColor) {
var canContinue = true;
$(sws+' .ageval_container').each(function(e,i){
if($(this).css('display')!='none' && $(this).find('select').val()==='none') {
if($(this).find('.sw-placeholder.sw-initial').length) {
if(!doNotColor) {
if (!$(this).hasClass('sw-error')) {
$(this).addClass('sw-error');
$(this).parent().find('.searchbox_age').addClass('sw-error');
// tracking children ages inserting error
track_sw_children_error();
}
}
canContinue = false;
}
}
});
return canContinue;
}
function resetAges(sws,room_id,child_id) {
var defaultAge = 'none';//(isIPhone()||isIPad()||isIE8())?'none':'0';
$(sws+' .ageval_r'+room_id+'_'+child_id)
.val(defaultAge)
.parent()
.removeClass('sw-error')
.find('.sw-placeholder')
.text(context.model.avlsrc_site_label.child_age_unfilled)
.addClass('sw-initial')
.removeClass('sw-error');
}
function focusFirstError() {
var $error = $('.ageval_container.sw-error');
if ($error.length>0) {
$error.eq(0).find('select').focus();
}
}
/*
* when error occurs (some child without age selected) scroll the page to display the error
*/
function shouldPerformScroll(){
if(lockNextScroll){
lockNextScroll=false;
return false;
}
return true;
}
function scrollToError(sws) {
var $errors = $(sws+' .ageval_container.sw-error');
if ($errors.length>0) {
var firstRoomWithError = $errors.eq(0).closest('.sw-room');
scrollToElementIfOutsideView(firstRoomWithError,true,3);
}
}
function scrollToSearchbox(sws) {
scrollToElementIfOutsideView($(sws),true);
}
function scrollToModalSearch(sws) {
var $modal = $(sws+' .pr_val_modal');
var $container = $(sws+' .pr_val_container');
var totHeight = $modal.outerHeight() + $modal.position().top;
scrollToElementIfOutsideView($container,true,20,10,totHeight);
}
function quickScrollToWrapper() {
scrollToElementIfOutsideView($('#themewrapper'),false,0);
}
function quickScrollToTop() {
if(!shouldPerformScroll()) return true;
$('window,html,body').scrollTop(0);
}
function scrollToElementIfOutsideView($element,animated,posOffset,posOffsetBottom,forceToHeight) {
if(!shouldPerformScroll()) return true;
if($element.length===0) return true;
if(!posOffset && posOffset!=0) posOffset=10;
if(!posOffsetBottom && posOffsetBottom!=0) posOffsetBottom=posOffset;
if(!forceToHeight && forceToHeight!=0) forceToHeight=$element.height();
var yMin = $(window).scrollTop();
var yMax = $(window).scrollTop() + $(window).height();
var yPosMin = $element.offset().top - posOffset;
var yPosMax = $element.offset().top + forceToHeight + posOffsetBottom;
var isAbove = (yPosMin <= yMin);
var isBelow = (yPosMax >= yMax);
var isBottomOutside = (yPosMax >= $(window).height()+yPosMin);
var scrollToPos = (isAbove||isBottomOutside) ? yPosMin : isBelow ? yPosMax-$(window).height() : 0;
if(isAbove || isBelow || isBottomOutside) {
if(animated)
$('window,html,body').animate({scrollTop:scrollToPos});
else
$('window,html,body').scrollTop(scrollToPos);
}
}
/*
* general select events
*/
function selectFocus() {
$(this).parent().addClass('sw-selected');
}
function selectBlur() {
$(this).parent().removeClass('sw-selected');
}
/*
* adults/children/ages select events
*/
function simpleSelectChange(e,additionalLabel) {
if(!isKeycodeAccepted(e.keyCode)) return true;
additionalLabel || (additionalLabel='');
//var sws = parentSearchSelector($(e.currentTarget));
var selectContainer = $(e.target).parent();
var selectedOption = $(e.target).find("option:selected");
selectContainer.find('.sw-placeholder')
.text(selectedOption.text()+additionalLabel)
.removeClass('sw-initial');
}
function childrenSelectChange(e){
simpleSelectChange(e,' '+context.model.avlsrc_site_label.child_age_range);
var $sel = $(e.target);
var sws = e.sws ? e.sws : parentSearchSelector($sel);
var selectContainer = $sel.parent();
var selectedOption = $sel.find("option:selected");
var roomid = $sel.parents('.sw-room').attr('class').replace(/sw-room|-| /g,'');
// show/hide age selectors
var ageSelectContainer;
for(var i=1;i<=6;i++){
ageSelectContainer = $(sws+' .ageval_r'+roomid+'_'+i).parent();
if(i>selectedOption.val()) {
ageSelectContainer.hide();
resetAges(sws,roomid,i);
} else {
ageSelectContainer.show();
}
if(ageSelectContainer.closest('.sw-children').find('.ageval_container.sw-error').length==0) {
ageSelectContainer.closest('.sw-children').find('.sw-error').removeClass('sw-error');
}
}
if(checkChildrenAges(sws,true))
unlockPageWithOverlay(sws);
else
lockPageWithOverlay(sws);
// show/hide and update ages label
var age_mlg = '';
if(selectedOption.val()==0) {
selectContainer.parent().find('.searchbox_age').text('').hide();
} else {
if(selectedOption.val()==1) {
age_mlg = context.model.avlsrc_site_label.child_age;
} else {
age_mlg = context.model.avlsrc_site_label.children_ages;
}
selectContainer.parent().find('.searchbox_age').text(age_mlg).show();
}
updateRoomsObject(sws);
}
function roomSelectChange(e){
if(e.keyCode==9 && e.shiftKey) return false;
simpleSelectChange(e);
var $sel = $(e.target);
var sws = e.sws ? e.sws : parentSearchSelector($sel);
updateRooms(sws, $sel.val());
// update the summary
updateRoomsObject(sws);
}
function adultSelectChange(e){
simpleSelectChange(e);
var $sel = $(e.target);
var sws = e.sws ? e.sws : parentSearchSelector($sel);
// update the summary
updateRoomsObject(sws);
}
function ageSelectChange(e){
simpleSelectChange(e);
var $sel = $(e.target);
var sws = e.sws ? e.sws : parentSearchSelector($sel);
if($sel.val()=='none'){
lockPageWithOverlay(sws);
$sel.parent().addClass('sw-error')
.find('.sw-placeholder').addClass('sw-initial')
.closest('.sw-children').find('.searchbox_age').addClass('sw-error');
}else{
$sel.parent().removeClass('sw-error');
if($sel.closest('.sw-children').find('.ageval_container.sw-error').length==0) {
$sel.closest('.sw-children').find('.sw-error').removeClass('sw-error');
}
}
if(checkChildrenAges(sws,true)){
unlockPageWithOverlay(sws);
}
// update the summary
updateRoomsObject(sws);
}
/*
* show/hide modal
*/
function showModal(sws,keepOtherOpened) {
if(!keepOtherOpened){
closeAllAndRestoreDefaults();
}
$(sws+' .pr_val_modal'+(useOverlay?','+sws+' .sw_background_modal':'')).show();
addBodySearchboxClass(sws);
$(sws+(isIPhone()||isIPad() ? ' .sw_accept_modal' : ' .rnum')).focus();
var doScroll = (isIPhone()) ? quickScrollToTop : scrollToModalSearch;
doScroll(sws);
return true;
}
function hideModal(sws) {
if(checkChildrenAges(sws)) {
$(sws+' .pr_val_modal'+(useOverlay?','+sws+' .sw_background_modal':'')).hide();
var swopened = searchWidgetsOpened();
if(sws===''){
for(var s in swopened){
removeBodySearchboxClass(swopened[s])
}
} else {
removeBodySearchboxClass(sws);
swopened = [sws];
}
var doScroll = isIPhone()?quickScrollToWrapper:scrollToSearchbox;
doScroll(swopened[0]);
unlockPageWithOverlay(sws)
return true;
} else {
lockPageWithOverlay(sws);
scrollToError(sws);
focusFirstError();
return false;
}
}
function lockPageWithOverlay(sws) {
if(sws==='') return false;
var $sb = $(sws);
var overlay = {
width:  $sb.width()  + Number($sb.css('padding-left').replace('px','')) + Number($sb.css('padding-right').replace('px','')),
height: $sb.height() + Number($sb.css('padding-top').replace('px',''))  + Number($sb.css('padding-bottom').replace('px',''))
};
$(sws+' .sw_background_modal').css(overlay).show();
$(sws+' .sw_background_modal').offset($(sws).offset());
}
function unlockPageWithOverlay(sws) {
$(sws+' .sw_background_modal').hide();
}
/*
* add/remove rooms
*/
function updateRooms(sws,tot) {
var rooms = $(sws+' .sw-room').length;
if(tot>rooms) {
addRooms(sws,tot-rooms);
} else if(tot< rooms) {
removeRooms(sws,rooms-tot);
}
}
function addRooms(sws,num) {
for(var i=0;i< num;i++){
addNewRoom(sws);
}
updateEvents();
}
function addNewRoom(sws) {
var rooms = $(sws+' .sw-room').length;
var roomContainer = $('<div class="sw-room sw-room-'+(rooms+1)+'" />');
roomContainer.html(roomDOM(sws));
$(sws+' .sw-rooms-list').append(roomContainer);
}
function removeRooms(sws,num) {
var roomid = 0;
var rooms = $(sws+' .sw-room').length;
for(var i=0;i< num;i++){
roomid = rooms-i;
$(sws+' .sw-room-'+roomid).remove();
}
if(checkChildrenAges(sws,true)){
unlockPageWithOverlay(sws);
}
}
/*
* manage keycodes
*/
function isKeycodeAccepted(keycode) {
if(keycode===undefined) return true;
if((keycode>=37 && keycode<=40) || // arrows
(keycode>=48 && keycode<=57))   // numbers
{
return true;
}
return false;
}
/*
* generate rooms dropdown based on sw_config properties
*/
function addRoomSelect(sws) {
var selectRooms = dropdownDOM('room');
$(sws+' .pr_val_modal_content').prepend(selectRooms);
}
/*
* getters for DOM elements
*/
function roomDOM(sws) {
var roomid = $(sws+' .sw-room').length +1;
var dom = [];
dom.push('<div class="searchbox_room_count">'+context.model.avlsrc_site_label.input_room.replace('%room_num%',roomid)+'</div>');
dom.push(dropdownDOM('adult', roomid));
dom.push(dropdownDOM('child', roomid));
dom.push('<div class="sw-children">');
dom.push('<div class="searchbox_age"></div>');
dom.push(agesDOM(roomid));
dom.push('</div>');
return dom.join('');
}
function dropdownDOM(type,roomid) {
var ids = {
room :'rnum',
adult:'pval',
child:'cval'
};
var val_id = ids[type];
var select_id = type=='room' ? '' : (val_id + (roomid ? '_r'+roomid : ''));
var name_id = type=='room' ? ids[type] : select_id;
var dropdown_label;
var persons = [];
persons.push('<div class="'+val_id+'_container">');
persons.push('<div class="sw-placeholder sw-initial"></div>');
persons.push('<select class="'+val_id+' '+select_id+'" name="'+name_id+'">');
for(var i=sw_config[type+'_min'];i<=sw_config[type+'_max'];i++){
dropdown_label = context.model.avlsrc_site_label[type+'_dropdown'];
dropdown_label = dropdown_label.replace('%'+type+'_num%',i);
dropdown_label = dropdown_label.replace('%'+type+'_short%',context.model.avlsrc_site_label[type+((i==1?'_singular':'_plural')+'_short')]);
persons.push('<option value="'+i+'"'+(i==sw_config[type+'_default']?' selected="selected"':'')+'>'+dropdown_label+'</option>');
}
persons.push('</select></div>');
return persons.join('');
}
function agesDOM(roomid) {
var ages = [];
for(var j=1;j<=6;j++){
ages.push('<div class="ageval_container">');
ages.push('<div class="sw-placeholder sw-initial">'+context.model.avlsrc_site_label.child_age_unfilled+'</div>');
ages.push('<select class="ageval ageval_r'+roomid+'_'+j+'" name="ageval_r'+roomid+'_'+j+'">');
if(true){//isIPhone()||isIPad()||isIE8()){
ages.push('<option value="none" selected="selected">'+context.model.avlsrc_site_label.child_age_unfilled+'</option>');
ages.push('<option value="0">'+context.model.avlsrc_site_label.child_age_infant+'</option>');
}else{
ages.push('<option value="0" selected="selected">'+context.model.avlsrc_site_label.child_age_infant+'</option>');
}
for(var i=1;i<=17;i++){
ages.push('<option value="'+i+'"> '+i+' </option>');
}
ages.push('</select></div>');
}
return ages.join('');
}
function searchWidgetIndex(sws){
for(var s in searchWidgetSelectors){
if(searchWidgetSelectors[s]===sws) return s;
}
return -1;
}
function searchWidgetsOpened(){
var sel,arr = [];
for(var s in searchWidgetSelectors){
sel = searchWidgetSelectors[s];
if(isSearchboxOpen(sel))
arr.push(sel);
}
return arr;
}
function parentSearchSelector($elem){
var sel;
for(var s=0;s< searchWidgetSelectors.length;s++){
sel = searchWidgetSelectors[s];
if($elem.parents(sel).length>0)
return sel;
}
return '';
}
function parentSearchWidget($elem){
var SWselector = parentSearchSelector($elem);
if(SWselector!=='')
return $(SWselector);
else
return null;
}
function isSearchboxOpen(sws){
var isopen = (sws==='') ?
$('body').hasClass('searchbox') :
checkBodySearchboxClass(sws);
return isopen;
}
function isIPhone(){
return ctrl.pageInfo.isIPhone;
}
function isIPad(){
return ctrl.pageInfo.isIPad;
}
function isIE8(){
return ctrl.pageInfo.isIE8;
}
/*
* manage body classes
*/
var bodySearchboxClass = 'searchbox';
var bodySearchboxPrefix = 'swc';
function addBodySearchboxClass(sws){
var swid = searchWidgetIndex(sws);
$('body').addClass(bodySearchboxPrefix+swid);
$('body').addClass(bodySearchboxClass);
}
function removeBodySearchboxClass(sws){
var swid = searchWidgetIndex(sws);
$('body').removeClass(bodySearchboxPrefix+swid);
if($('body').attr('class').indexOf(bodySearchboxPrefix)===-1)
$('body').removeClass(bodySearchboxClass);
}
function checkBodySearchboxClass(sws){
var swid = searchWidgetIndex(sws);
var isopen = $('body').hasClass(bodySearchboxPrefix+swid);
return isopen
}
// start tracking function utility
SWConfig.getRoomGuestTrackingObjData = getRoomGuestTrackingObjData;
function getRoomGuestTrackingObjData(pval, rval, rgval) {   
var roomGuestTrackingData = new Object();
if (!rgval) {
if (rval>0 && pval>0) {
rgval = psDAO.getRgvalFromPvalRval(pval, rval);
}
}
if (rgval) {
var rgValParts = rgval.split(SWConfig.rgvalArraySepChar);
roomGuestTrackingData.total_guest_number = 0;
roomGuestTrackingData.total_children_number = 0;
roomGuestTrackingData.total_rooms_number = 0;
roomGuestTrackingData.min_age_of_children = 99;      
var adult_array = getAdultsFromCookie(rgValParts[0]);
var child_array = getChildrenFromCookie(rgValParts[1]);
if(adult_array.length==child_array.length) {
// total number of rooms (as rval)
roomGuestTrackingData.total_rooms_number = adult_array.length;
for(var r=0; r < roomGuestTrackingData.total_rooms_number; r++){
// total number of guest (adults+children as pval)
roomGuestTrackingData.total_guest_number += parseInt(adult_array[r]) + parseInt(child_array[r].length);            
// number of children for each room
roomGuestTrackingData.total_children_number += parseInt(child_array[r].length);
// minimum age of children in each room
var room_child_min_age=99;
for(var c=0; c < child_array[r].length; c++){
if (parseInt(child_array[r][c]) < parseInt(room_child_min_age)) {
room_child_min_age = child_array[r][c];
}
}
if (parseInt(room_child_min_age) < parseInt(roomGuestTrackingData.min_age_of_children)) {
roomGuestTrackingData.min_age_of_children = room_child_min_age;
}            
}
// min age of all children in all rooms
var blank = " ";
roomGuestTrackingData.min_age_of_children = (roomGuestTrackingData.min_age_of_children==99?blank:parseInt(roomGuestTrackingData.min_age_of_children));
} 
return roomGuestTrackingData;
}
}    
function track_sw_children_error() {
if (typeof(window.track_sw_children_error) != 'undefined') {
var q = new Object();
if (ctrl) {
q.sfe = ctrl.detectSelectedFrontEndForTracking();
}
set_omniture_navigation_handler('track_sw_children_error', function(q) {});
return window.track_sw_children_error(q);
}
return false;
}
SWConfig.rgvalToString = rgvalToString;
var sfDAO = SWConfig.formDao;
sfDAO.init(SWConfig);
sfDAO.setCheckIn(psDAO.getCheckIn());
sfDAO.setCheckOut(psDAO.getCheckOut());
if(search_with_children){
sfDAO.setRoomGuest(psDAO.getRoomGuest());
} else {
sfDAO.setRooms(psDAO.getRooms());
sfDAO.setPersons(psDAO.getPersons());
}
sfDAO.setAllowedUrlParams(psDAO.getAllowedUrlParams());
//destination default value
var ishdp = $('body').is('#hdp');
var ishome = $('body').is('#home');
var watermarkClass = ishome?'watermark':'';
var w_dest = new watermark('#city',watermarkClass,$('#city').attr('alt'),ishome,ishome);
$('#find')
.unbind('.watermark')
.bind('click.watermark',function(e){
if(ishome)w_dest.hide();
SWConfig.submitController.doSubmitSW(true);
if(ishome)w_dest.show();
});
if(ishdp == true){
$('#hfind')
.unbind('.watermark')
.bind('click.watermark',function(e){  
SWConfig.submitController.doSubmitSW(true);
});
}
//checkin default value
var w_ci = new watermark('#checkin','watermark',$('#checkin').attr('alt'),false,true);
if(ishdp == true){
var w_hci = new watermark('#hcheckin','watermark',$('#hcheckin').attr('alt'),false,true);
}
//checkout default value
var w_co = new watermark('#checkout','watermark',$('#checkout').attr('alt'),false,true);
if(ishdp == true){
var w_hco = new watermark('#hcheckout','watermark',$('#hcheckout').attr('alt'),false,true);
}
var today = new Date();
today.clearTime();
var refreshDatepickerFun = function(e){
if(e.keyCode == 9
|| e.keyCode == 13
|| e.keyCode == 27
|| e.keyCode == 33
|| e.keyCode == 34
|| e.keyCode == 35
|| e.keyCode == 36
|| e.keyCode == 37
|| e.keyCode == 38
|| e.keyCode == 39
|| e.keyCode == 40){
return;
}
if($("#ui-datepicker-div").css("display") != "none"){
var curDate = Date.parseString(this.value,SWConfig.toolboxDateFormat);
if(curDate) {
var minDateMs = $(this).datepicker('option','minDate').getTime();
var maxDateMs = $(this).datepicker('option','maxDate');
if(curDate.getTime() >= minDateMs && curDate.getTime() <= maxDateMs){
$(this).datepicker('getDate');
$(this).datepicker('refresh');
}
}
}
}
var handlerFocusFun = function(){$(this).trigger('focus');}
var syncDatesfun = function(){syncDates(this, SWConfig.toolboxDateFormat);}
//jquery datepicker localization
/* English/UK initialisation for the jQuery UI date picker plugin. */
/* Written by Stuart. */
jQuery(function($){
$.datepicker.regional['en-GB'] = {
closeText: 'Done',
prevText: 'Prev',
nextText: 'Next',
currentText: 'Today',
monthNames: ['January','February','March','April','May','June',
'July','August','September','October','November','December'],
monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
weekHeader: 'Wk',
firstDay: 1,
isRTL: false,
showMonthAfterYear: false,
yearSuffix: ''};
$.datepicker.setDefaults($.datepicker.regional['en-GB']);
});
//common datepicker configurations
$.datepicker.setDefaults( {dateFormat: SWConfig.currentDateFormat.replace('yyyy','yy'),
duration: '', showOtherMonths: true, selectOtherMonths: true});
sfDAO.getCheckInCtrl().isBefore = true;
sfDAO.getCheckInCtrl().syncCtrl = sfDAO.getCheckOutCtrl();
$(sfDAO.getCheckInCtrl()).datepicker({minDate: new Date(today.getTime()).add('d',SWConfig.MIN_CHECKIN_ALLOWED_OFFSET),
maxDate: new Date(today.getTime()).add('d',SWConfig.MAX_CHECKIN_ALLOWED_OFFSET)});
$(sfDAO.getCheckInCtrl()).click(handlerFocusFun);
$(sfDAO.getCheckInCtrl()).keyup(refreshDatepickerFun);
$(sfDAO.getCheckInCtrl()).change(syncDatesfun);
sfDAO.getCheckOutCtrl().isBefore = false;
sfDAO.getCheckOutCtrl().syncCtrl = sfDAO.getCheckInCtrl();
$(sfDAO.getCheckOutCtrl()).datepicker({minDate: new Date(today.getTime()).add('d',SWConfig.MIN_CHECKOUT_ALLOWED_OFFSET),
maxDate: new Date(today.getTime()).add('d',SWConfig.MAX_CHECKOUT_ALLOWED_OFFSET)});
$(sfDAO.getCheckOutCtrl()).click(handlerFocusFun);
$(sfDAO.getCheckOutCtrl()).keyup(refreshDatepickerFun);
$(sfDAO.getCheckOutCtrl()).change(syncDatesfun);
SWConfig.submitController = new SubmitController(SWConfig);
SWConfig.inited = true;
$('#city,#pval,#rval,#pr_val_fake').bind('focus',function(e){
if($.datepicker && $.datepicker._hideDatepicker){
$.datepicker._hideDatepicker();
}
});
$('#checkin,#checkout').bind('touchstart',function(e){
if(ctrl.pageInfo.isIPad==false) return true;
if($.datepicker && $.datepicker._showDatepicker){
$.datepicker._showDatepicker(this);
}
});
}