Function ExecuteApp(InputParms) {
var ObjShell = new ActiveXObject("Shell.Application");
var ApptoRun = "Notepad.exe";
if (InputParms != "") {
var AppParms = C:\\FileName;
}
ObjShell.ShellExecute(ApptoRun, AppParms, "", "Open", "1");
}