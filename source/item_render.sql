function item_render (
  p_item in apex_plugin.t_page_item,
  p_plugin in apex_plugin.t_plugin,
  p_value in varchar2,
  p_is_readonly in boolean,
  p_is_printer_friendly in boolean )
  return apex_plugin.t_page_item_render_result
as
  l_html varchar2(32767); -- Dummy variable to store HTML

  l_input_name := apex_plugin.get_input_name_for_page_item(p_is_multi_value => false);
  l_ajax_id := apex_plugin.get_ajax_identifier;

  l_result apex_plugin.t_page_item_render_result; -- Result object to be returned


  -- %PLUGIN_ATTRIBUTES%

  -- %ITEM_ATTRIBUTES%

begin

  -- %DEBUG_ITEM%

  -- handle read only and printer friendly
  if p_is_readonly or p_is_printer_friendly then
    -- omit hidden field if necessary
    apex_plugin_util.print_hidden_if_readonly (
      p_item_name => p_item.name,
      p_value => p_value,
      p_is_readonly => p_is_readonly,
      p_is_printer_friendly => p_is_printer_friendly);

    -- omit display span with the value
    apex_plugin_util.print_display_only (
      p_item_name => p_item.name,
      p_display_value => p_value,
      p_show_line_break => false,
      p_escape => true, -- this is recommended to help prevent XSS
      p_attribute => p_item.element_attributes);
  else
    -- Not read only

    -- TODO mdsouza: How do do teh set/get methods for item


  end if; -- read only

  return l_result;
end item_render;
/
