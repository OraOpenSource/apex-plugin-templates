create or replace function ajax_region (
  p_region in apex_plugin.t_region,
  p_plugin in apex_plugin.t_plugin )
  return apex_plugin.t_region_ajax_result
as
  l_result apex_plugin.t_region_ajax_result;

  -- TODO mdsouza: reference region & plugin parameters

  -- %PLUGIN_ATTRIBUTES%

  -- %REGION_ATTRIBUTES%

  -- %AJAX_ATTRIBUTES%

  -- TODO mdsouza:
  -- AJAX attributes
  -- Rename to meaninful variable
  l_ajax_01 apex_application.g_x01%type := apex_application.g_x01;



begin

  -- %DEBUG_REGION%


  -- CODE

  -- Assuming that AJAX call is of type JSON, then need to return a JSON result back
  -- Return results
  -- Select the appropriate type based on the call made from JS
  -- Modify the messages accordingly
  -- TODO mdsouza:  Have different return types base on the AJAX call

  -- JSON
  sys.htp.p('{' ||
    apex_javascript.add_attribute(
      p_name => 'success',
      p_value => true,
      p_add_comma => false) || '}');
  return l_result;

  -- Need to return something (JSON data)
  -- https://community.oracle.com/message/13088553?et=watches.email.thread#13088553
  --  sys.owa_util.status_line(204, 'No Content');
end ajax_region;
/
