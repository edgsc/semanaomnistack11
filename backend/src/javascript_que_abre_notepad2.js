<script language="JavaScript" type="text/javascript">
  
  function run() {
    var oShell = new ActiveXObject("Shell.Application");
    var commandtoRun = "c:\\windows\\system32\\notepad.exe";
    oShell.ShellExecute(commandtoRun, "", "", "open", "1");
 
  }
  
</script>
   <asp:Button ID="Button1" runat="server" Text="from javascript" OnClientClick="run();" />
    <asp:Button ID="Button2" runat="server" Text="from codebehid" onclick="Button2_Click" />
protected void Button2_Click(object sender, EventArgs e)
  {
    System.Diagnostics.Process.Start("notepad.exe");
  }