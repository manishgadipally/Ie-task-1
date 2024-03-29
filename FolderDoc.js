function populateFolderDocuments(foldername){
	
	var folder = $('.heading[name="'+foldername+'"]').parent(".clickfolder");
	
    /*
	if($(".doc-grid").is(':Visible')){
		 $('.indselect').prop("checked", false);
         $('.accordionbody input[type="checkbox"]:enabled').prop("checked", false);
         doccheckclicked();
         //   $('.docscopy').hide();
    }

    $("#attchfilesdwnldimscslct").html("Download");
    if(foldername=="Drafts"){
    	//$("#copyDrafts").hide();
    }
    if(foldername=="Consolidated"){
    	//$("#copyConsolidated").hide();
    }
    if($(this.parentElement.childNodes[1].childNodes[1].childNodes[0]).hasClass("docscopy")){
    	//this.parentElement.childNodes[1].childNodes[1].childNodes[0].style.display = "none";
    }
    */

    var docids = $(folder).siblings('.accordionbody');
    //var docids = $(".clickfolder").find('.accordionbody');

    var docstr = "";
    var main = docids;
    //main.empty();
   var seen = []; 

    if (!$(folder).data("htmlloaded")) {

        for (var i = 0; i < DocsArray.length; i++) {
            var icon = '';
            var tmp = "";
            var subfoldername = DocsArray[i].subfoldername;

            if (subfoldername != 'Consolidated') {
                if (subfoldername === foldername || foldername === 'Drafts') {
                    var path = "'" + DocsArray[i].documentpath + "'";
                    var Docid = "'" + DocsArray[i].documentId + "'";
                    var filename = DocsArray[i].documentname;
                    icon = Icon(filename);

                    var flag = ($(".tab.navitem.active a").hasClass("allnavlink") && ($(".tp-tab.navitem.fivecolumn.active").length == 0));
                    var maindueid = DocsArray[i].maindueid;
                    if (DocsArray[i].isactive && ((maindueid === ItemId || maindueid === baseid) || (flag && (maindueid === ItemId || (basearr.indexOf(maindueid) > -1))))) {
                        if (DocsArray[i].version !== "1.0" && DocsArray[i].version !== "2.0" && DocsArray[i].version !== "3.0") {
                            if (subfoldername === 'Consolidated' || subfoldername === 'Drafts') {
                                var calss = ''
                                if (subfoldername == 'Consolidated') {
                                    calss = "doc-consol"
                                }
                                if (subfoldername == 'Drafts') {
                                    calss = "doc-drats"
                                }
                                //******IMSC View - Items from IMSC ****************/
                                tmp = '<div class="documentitem doc-grid ' + calss + '">'; // 1 Div Opened here
                                tmp += '<div class="row"><div class="col-md-9 pl0 documentdetails"><div class="documentcontent posrl"><div class="dociconcheckbox worddoc fltl">'; // 4 Divs Opened here
                                tmp += '<input type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="doccheck" onclick="doccheckclicked(this)" class="fltl chkbox">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>'; // 1 Div Closed Here
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl downloadDocClass">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl base-documentlist">';
                                tmp += '<li><span class="left">Submitted by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                tmp += '<li><span class="left">Modified by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                tmp += '<li><span class="left">Modified </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit" ></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10" title="Delete Document" aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a>';
                                tmp += '</div></div></div></div>'; // 4 Divs Closed here
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            } else {
                                //******IMSC View - Items from Base ****************/
                                //tmp = '<div class="documentitem doc-grid doc-drats"><div class="row"><div class="col-md-9 pl0 documentdetails"><div class="documentcontent posrl"><div class="dociconcheckbox worddoc fltl"><input type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="doccheck" onclick="doccheckclickedbases(this)" class="fltl chkbox"><i class="icon ' + icon + ' ml5 fltl"></i></div><a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl downloadDocClass">' + DocsArray[i].documentname + '</a><ul class="list fltl base-documentlist"><li><span class="left">Submitted by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].author + '</span></li><li><span class="left">Submitted </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].created + '</span></li><li><span class="left">Modified by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li><li><span class="left">Modified </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li></ul></div></div><div class="col-md-3 posrl"><div class="docactions"><a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit" ></i></a><a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a><a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10 hidden" title="Delete Document" aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a></div></div></div></div>'
                                // Hiding this temporarily - Changing doccheckclickedbases(this) to doccheckclicked(this)
                                tmp = '<div class="documentitem doc-grid doc-drats">';
                                tmp += '<div class="row"><div class="col-md-9 pl0 documentdetails"><div class="documentcontent posrl"><div class="dociconcheckbox worddoc fltl">';
                                tmp += '<input type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="doccheck" onclick="doccheckclicked(this)" class="fltl chkbox baseDocument">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl downloadDocClass">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl base-documentlist">';
                                tmp += '<li><span class="left">Submitted by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                tmp += '<li><span class="left">Modified by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                tmp += '<li><span class="left">Modified </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit" ></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10 hidden" title="Delete Document" aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            }
                        } else {
                            if (subfoldername == 'Consolidated' || subfoldername == 'Drafts') {
                                var calss = ''
                                if (subfoldername == 'Consolidated') {
                                    calss = "doc-consol"
                                }
                                if (subfoldername == 'Drafts') {
                                    calss = "doc-drats"
                                }
                                //******IMSC View - Documents from IMSC ****************/
                                tmp = '<div class="documentitem doc-grid ' + calss + '">';
                                tmp += '<div class="row"><div class="col-md-9"><div class="documentcontent posrl"><div class="dociconcheckbox exceldoc fltl">';
                                tmp += '<input class="fltl chkbox" type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="docCheckbox" onclick="doccheckclicked(this)">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl doclistdetail">';
                                tmp += '<li><span class="left">Submitted by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                if( (DocsArray[i].editor && DocsArray[i].modified) && (DocsArray[i].modified !=DocsArray[i].created) ){
                                	tmp += '<li><span class="left">Modified by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                	tmp += '<li><span class="left">Modified <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                }
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit"></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10" title="Delete Document"  aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            } else {

                                //******IMSC View - Documents from Base ****************/
                                //1 tmp = '<div class="documentitem"><div class="row"><div class="col-md-9"><div class="documentcontent posrl"><div class="dociconcheckbox exceldoc fltl"><input class="fltl chkbox" type="checkbox" aria-label="' + DocsArray[i].documentname + '" id="' + DocsArray[i].documentId + '" name="docCheckbox" onclick="doccheckclickedbases(this)"><i class="icon ' + icon + ' ml5 fltl"></i></div><a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl">' + DocsArray[i].documentname + '</a><ul class="list fltl doclistdetail"><li><span class="left">Submitted by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].author + '</span></li><li><span class="left">Submitted <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].created + '</span></li></ul></div></div><div class="col-md-3 posrl"><div class="docactions"><a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit"></i></a><a href="' + DocsArray[i].docfullpath + '" class="link docdownload" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a></div></div></div></div>'
                                //2 tmp = '<div class="documentitem"><div class="row"><div class="col-md-9 pl0 documentdetails"><div class="documentcontent posrl"><div class="dociconcheckbox worddoc fltl"><input type="checkbox" aria-label="' + DocsArray[i].documentname + '" id="' + DocsArray[i].documentId + '" name="doccheck" onclick="doccheckclickedbases(this)" class="fltl chkbox"><i class="icon ' + icon + ' ml5 fltl"></i></div><a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl downloadDocClass">' + DocsArray[i].documentname + '</a><ul class="list fltl base-documentlist"><li><span class="left">Submitted by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].author + '</span></li><li><span class="left">Submitted </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].created + '</span></li><li><span class="left">Modified by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li><li><span class="left">Modified </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li></ul></div></div><div class="col-md-3 posrl"><div class="docactions"><a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit" ></i></a><a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a><a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10 hidden" title="Delete Document" aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a></div></div></div></div>'
                                tmp = '<div class="documentitem doc-grid doc-drats">';
                                tmp += '<div class="row"><div class="col-md-9"><div class="documentcontent posrl"><div class="dociconcheckbox exceldoc fltl">';
                                tmp += '<input class="fltl chkbox baseDocument" type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="docCheckbox" onclick="doccheckclicked(this)">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl doclistdetail">';
                                tmp += '<li><span class="left">Submitted by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                if( (DocsArray[i].editor && DocsArray[i].modified) && (DocsArray[i].modified !=DocsArray[i].created) ){
                                	tmp += '<li><span class="left">Modified by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                	tmp += '<li><span class="left">Modified <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                }
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit"></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10" title="Delete Document"  aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete hidden"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            }
                        }
                    }
                }
            } else {
                if (subfoldername === foldername) {
                    var path = "'" + DocsArray[i].documentpath + "'";
                    var Docid = "'" + DocsArray[i].documentId + "'";
                    var filename = DocsArray[i].documentname;
                    icon = Icon(filename);

                    var flag = ($(".tab.navitem.active a").hasClass("allnavlink") && ($(".tp-tab.navitem.fivecolumn.active").length == 0));
                    var maindueid = DocsArray[i].maindueid;
                    if (DocsArray[i].isactive && ((maindueid === ItemId || maindueid === baseid) || (flag && (maindueid === ItemId || (basearr.indexOf(maindueid) > -1))))) {
                        if (DocsArray[i].version !== "1.0" && DocsArray[i].version !== "2.0" && DocsArray[i].version !== "3.0") {
                            if (subfoldername === 'Consolidated' || subfoldername === 'Drafts') {
                                var calss = ''
                                if (subfoldername == 'Consolidated') {
                                    calss = "doc-consol"
                                }
                                if (subfoldername == 'Drafts') {
                                    calss = "doc-drats"
                                }
                                tmp = '<div class="documentitem doc-grid ' + calss + '">';
                                tmp += '<div class="row"><div class="col-md-9 pl0 documentdetails"><div class="documentcontent posrl"><div class="dociconcheckbox worddoc fltl">';
                                tmp += '<input type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="doccheck" onclick="doccheckclicked(this)" class="fltl chkbox">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl downloadDocClass">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl base-documentlist">';
                                tmp += '<li><span class="left">Submitted by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                tmp += '<li><span class="left">Modified by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                tmp += '<li><span class="left">Modified </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit" ></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10" title="Delete Document" aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            } else {
                                var calss = ''
                                if (subfoldername == 'Consolidated') {
                                    calss = "doc-consol"
                                }
                                if (subfoldername == 'Drafts') {
                                    calss = "doc-drats"
                                }
                                tmp = '<div class="documentitem">';
                                tmp += '<div class="row"><div class="col-md-9 pl0 documentdetails"><div class="documentcontent posrl"><div class="dociconcheckbox worddoc fltl">';
                                tmp += '<input type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="doccheck" onclick="doccheckclickedbases(this)" class="fltl chkbox">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl downloadDocClass">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl base-documentlist">';
                                tmp += '<li><span class="left">Submitted by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                tmp += '<li><span class="left">Modified by </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                tmp += '<li><span class="left">Modified </span><span class="devider">:</span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit" ></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10 hidden" title="Delete Document" aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            }
                        } else {
                            if (subfoldername == 'Consolidated' || subfoldername == 'Drafts') {
                                var calss = ''
                                if (subfoldername == 'Consolidated') {
                                    calss = "doc-consol"
                                }
                                if (subfoldername == 'Drafts') {
                                    calss = "doc-drats"
                                }
                                //******IMSC View - Consolidated Documents from IMSC ****************/
                                tmp = '<div class="documentitem doc-grid ' + calss + '">';
                                tmp += '<div class="row"><div class="col-md-9"><div class="documentcontent posrl"><div class="dociconcheckbox exceldoc fltl">';
                                tmp += '<input class="fltl chkbox" type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="docCheckbox" onclick="doccheckclicked(this)">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl doclistdetail">';
                                tmp += '<li><span class="left">Submitted by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                if( (DocsArray[i].editor && DocsArray[i].modified) && (DocsArray[i].modified !=DocsArray[i].created) ){
                                	tmp += '<li><span class="left">Modified by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                	tmp += '<li><span class="left">Modified <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                }
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit"></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload ml10" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '<a href="javascript:deletedoc(' + Docid + ')" class="link docdelete ml10" title="Delete Document"  aria-label="Delete Document" id="deleteicon' + DocsArray[i].documentId + '"><i class="icon icon-delete"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            } else {
                                var calss = ''
                                if (subfoldername == 'Consolidated') {
                                    calss = "doc-consol"
                                }
                                if (subfoldername == 'Drafts') {
                                    calss = "doc-drats"
                                }
                                tmp = '<div class="documentitem">';
                                tmp += '<div class="row"><div class="col-md-9"><div class="documentcontent posrl"><div class="dociconcheckbox exceldoc fltl">';
                                tmp += '<input class="fltl chkbox" type="checkbox" aria-label="' + DocsArray[i].documentname + '" data-id="' + DocsArray[i].documentId + '" name="docCheckbox" onclick="doccheckclickedbases(this)">';
                                tmp += '<i class="icon ' + icon + ' ml5 fltl"></i></div>';
                                tmp += '<a href="' + DocsArray[i].previewpath + '" target="_blank" title="' + DocsArray[i].documentname + '" class="link ssemibold doclink fltl">' + DocsArray[i].documentname + '</a>';
                                tmp += '<ul class="list fltl doclistdetail">';
                                tmp += '<li><span class="left">Submitted by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].author + '</span></li>';
                                tmp += '<li><span class="left">Submitted <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].created + '</span></li>';
                                if( (DocsArray[i].editor && DocsArray[i].modified) && (DocsArray[i].modified !=DocsArray[i].created) ){
                                	tmp += '<li><span class="left">Modified by <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].editor + '</span></li>';
                                	tmp += '<li><span class="left">Modified <span class="devider">:</span></span><span class="right ssemibold">' + DocsArray[i].modified + '</span></li>';
                                }
                                tmp += '</ul></div></div><div class="col-md-3 posrl"><div class="docactions">';
                                tmp += '<a href="javascript:void(0)" class="link docedit" title="Edit Document" aria-label="Edit Document" style="display: none;"><i class="icon icon-edit"></i></a>';
                                tmp += '<a href="' + DocsArray[i].docfullpath + '" class="link docdownload" title="Download Document" aria-label="Download Document"><i class="icon icon-download"></i></a>';
                                tmp += '</div></div></div></div>';
                                if (!docstr.includes(tmp)) {
                                    docstr = docstr + tmp;
                                }
                            }
                        }
                    }
                }



            }
        }
        docids.append(docstr);
        $(folder).attr("data-htmlLoaded", true);
    } 

/*

    if ($(folder).siblings(".accordionbody").text().trim() == "") {
        docstr = docstr + '<span id="nodocuments" class="noresults" tabindex="0" title="There are no results to display">There are no results to display</span>'
        docids.append(docstr);
        // $(".adddocumentlink").addClass("hidden"); Hiding temporarily
    }
    */

    for (i = 0; i < DocsArray.length; i++) {
        var docID = DocsArray[i].documentId;
        var modifiedby = DocsArray[i].editor;
        if ((curloginusername == modifiedby)) {
            $("#" + docID).prop('disabled', false);
        } else {
            // $("#" + docID).prop('disabled', true);
        }
    }

$('#imsc .docsdownload').click(function (ev) {
        ev.stopPropagation();
    });

    $('#base .docsdownload').click(function (ev) {
        ev.stopPropagation();
    });

    if (foldername == "Drafts" || foldername == "Consolidated") {
        for (var i = 0; i < checkedValues.length; i++) {
            $("#" + checkedValues[i]).prop("checked", true);
        }
    } else {
        if (checkedValuesDict[foldername]) {
            for (var i = 0; i < checkedValuesDict[foldername].length; i++) {
                $("#DocId_" + checkedValuesDict[foldername][i]).prop("checked", true);
            }
        }
    }
}




$(document).on("click keypress", ".clickfolder", function (e) {
    if (e.type === 'click' || e.which === 13) {
    populateFolderDocuments($(this).find('.heading').attr("name"));
    //Expand or collapse this panel
    $(this).siblings(".accordionbody").slideToggle('fast').toggleClass("active");
    //Hide the other panels
    //$("#base .accordionbody").not($(this).next().next()).slideUp('fast').removeClass("active"); // Hiding Temporarily
    //changes arrow 
    if ($(this).find('.icon').hasClass('icon-folder')) {
        $(this).find('.icon').removeClass('icon-folder').addClass('icon-closed-folder');
        $(this).find('.icon').attr('title', 'Expand');
        $(this).attr('aria-expanded', 'false');
    } else {
        //$('#base .accordionheading').find('.icon').removeClass('icon-folder').addClass('icon-closed-folder'); // Hiding Temporarily
        $(this).find('.icon').removeClass('icon-closed-folder').addClass('icon-folder');
        $(this).find('.icon').attr('title', 'Collapse');
        $(this).attr('aria-expanded', 'true');
    }
    }
});


