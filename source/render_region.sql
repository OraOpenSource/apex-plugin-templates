create or replace function render_nest (
  p_region in apex_plugin.t_region,
  p_plugin in apex_plugin.t_plugin,
  p_is_printer_friendly in boolean )
  return apex_plugin.t_region_render_result
as
  subtype plugin_attr is varchar2(32767);

  -- Variables
  l_result apex_plugin.t_region_render_result;
  l_html varchar2(32767); -- Dummy variable to store HTML
  l_ajax_id := apex_plugin.get_ajax_identifier;

  -- Only required if planning to use AJAX
  l_ajax_identifier varchar2(255) := apex_plugin.get_ajax_identifier;

  -- Applicaion attributes
  -- these are plugin attributes that are shared amongst all instances of the plugin
  -- defined in shared components > plugins > <plugin> > custom attributes
  -- rename to meaninful variable
  l_app_val_01 plugin_attr := p_plugin.attribute_01;

  -- Component attributes
  -- these are plugin attributes specific to each instantiation of the plugin
  -- defined when modifying the plgin object
  -- rename to meaninful variable
  l_comp_val_01 plugin_attr := p_region.attribute_01;

begin
  -- debug information will be included
  if apex_application.g_debug then
    apex_plugin_util.debug_region (
      p_plugin => p_plugin,
      p_region => p_region,
      p_is_printer_friendly => p_is_printer_friendly);
  end if;

  -- CODE

  -- Example of how to call custom jQuery Widget
  -- Delete if not using a widget
  l_html := q'!$("#%ID%").widgetName({'ajaxId' : '%AJAX_ID' })!';
  l_html := replace(l_html, '%ID%', p_region.static_id);
  l_html := replace(l_html, '%AJAX_ID%', l_ajax_id);

  apex_javascript.add_onload_code(p_code => l_html);

  return l_result;
end render_nest;
/
