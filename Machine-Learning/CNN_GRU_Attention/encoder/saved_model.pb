Мо
п«
B
AssignVariableOp
resource
value"dtype"
dtypetypeѕ
~
BiasAdd

value"T	
bias"T
output"T" 
Ttype:
2	"-
data_formatstringNHWC:
NHWCNCHW
h
ConcatV2
values"T*N
axis"Tidx
output"T"
Nint(0"	
Ttype"
Tidxtype0:
2	
8
Const
output"dtype"
valuetensor"
dtypetype
Г
GatherV2
params"Tparams
indices"Tindices
axis"Taxis
output"Tparams"

batch_dimsint "
Tparamstype"
Tindicestype:
2	"
Taxistype:
2	
.
Identity

input"T
output"T"	
Ttype
q
MatMul
a"T
b"T
product"T"
transpose_abool( "
transpose_bbool( "
Ttype:

2	
e
MergeV2Checkpoints
checkpoint_prefixes
destination_prefix"
delete_old_dirsbool(ѕ

NoOp
M
Pack
values"T*N
output"T"
Nint(0"	
Ttype"
axisint 
C
Placeholder
output"dtype"
dtypetype"
shapeshape:
Ї
Prod

input"T
reduction_indices"Tidx
output"T"
	keep_dimsbool( " 
Ttype:
2	"
Tidxtype0:
2	
@
ReadVariableOp
resource
value"dtype"
dtypetypeѕ
E
Relu
features"T
activations"T"
Ttype:
2	
[
Reshape
tensor"T
shape"Tshape
output"T"	
Ttype"
Tshapetype0:
2	
o
	RestoreV2

prefix
tensor_names
shape_and_slices
tensors2dtypes"
dtypes
list(type)(0ѕ
l
SaveV2

prefix
tensor_names
shape_and_slices
tensors2dtypes"
dtypes
list(type)(0ѕ
?
Select
	condition

t"T
e"T
output"T"	
Ttype
P
Shape

input"T
output"out_type"	
Ttype"
out_typetype0:
2	
H
ShardedFilename
basename	
shard

num_shards
filename
Й
StatefulPartitionedCall
args2Tin
output2Tout"
Tin
list(type)("
Tout
list(type)("	
ffunc"
configstring "
config_protostring "
executor_typestring ѕ
@
StaticRegexFullMatch	
input

output
"
patternstring
N

StringJoin
inputs*N

output"
Nint(0"
	separatorstring 
P
	Transpose
x"T
perm"Tperm
y"T"	
Ttype"
Tpermtype0:
2	
ќ
VarHandleOp
resource"
	containerstring "
shared_namestring "
dtypetype"
shapeshape"#
allowed_deviceslist(string)
 ѕ"serve*2.6.22v2.6.2-0-gc2363d6d0258їъ
є
encoder/dense/kernelVarHandleOp*
_output_shapes
: *
dtype0*
shape:
ђђ*%
shared_nameencoder/dense/kernel

(encoder/dense/kernel/Read/ReadVariableOpReadVariableOpencoder/dense/kernel* 
_output_shapes
:
ђђ*
dtype0
}
encoder/dense/biasVarHandleOp*
_output_shapes
: *
dtype0*
shape:ђ*#
shared_nameencoder/dense/bias
v
&encoder/dense/bias/Read/ReadVariableOpReadVariableOpencoder/dense/bias*
_output_shapes	
:ђ*
dtype0

NoOpNoOp
Ћ
ConstConst"/device:CPU:0*
_output_shapes
: *
dtype0*л
valueкB├ B╝
m
	dense
	variables
trainable_variables
regularization_losses
	keras_api

signatures
h

kernel
bias
		variables

trainable_variables
regularization_losses
	keras_api

0
1

0
1
 
Г
	variables
non_trainable_variables
trainable_variables
layer_metrics
metrics

layers
layer_regularization_losses
regularization_losses
 
QO
VARIABLE_VALUEencoder/dense/kernel'dense/kernel/.ATTRIBUTES/VARIABLE_VALUE
MK
VARIABLE_VALUEencoder/dense/bias%dense/bias/.ATTRIBUTES/VARIABLE_VALUE

0
1

0
1
 
Г
		variables
non_trainable_variables

trainable_variables
layer_metrics
metrics

layers
layer_regularization_losses
regularization_losses
 
 
 

0
 
 
 
 
 
 
ё
serving_default_input_1Placeholder*,
_output_shapes
:         @ђ*
dtype0*!
shape:         @ђ
У
StatefulPartitionedCallStatefulPartitionedCallserving_default_input_1encoder/dense/kernelencoder/dense/bias*
Tin
2*
Tout
2*
_collective_manager_ids
 *,
_output_shapes
:         @ђ*$
_read_only_resource_inputs
*0
config_proto 

CPU

GPU2*0J 8ѓ *-
f(R&
$__inference_signature_wrapper_513101
O
saver_filenamePlaceholder*
_output_shapes
: *
dtype0*
shape: 
Ы
StatefulPartitionedCall_1StatefulPartitionedCallsaver_filename(encoder/dense/kernel/Read/ReadVariableOp&encoder/dense/bias/Read/ReadVariableOpConst*
Tin
2*
Tout
2*
_collective_manager_ids
 *
_output_shapes
: * 
_read_only_resource_inputs
 *0
config_proto 

CPU

GPU2*0J 8ѓ *(
f#R!
__inference__traced_save_513249
┼
StatefulPartitionedCall_2StatefulPartitionedCallsaver_filenameencoder/dense/kernelencoder/dense/bias*
Tin
2*
Tout
2*
_collective_manager_ids
 *
_output_shapes
: * 
_read_only_resource_inputs
 *0
config_proto 

CPU

GPU2*0J 8ѓ *+
f&R$
"__inference__traced_restore_513265┌ѕ
є
ќ
&__inference_dense_layer_call_fn_513190

inputs
unknown:
ђђ
	unknown_0:	ђ
identityѕбStatefulPartitionedCallщ
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *,
_output_shapes
:         @ђ*$
_read_only_resource_inputs
*0
config_proto 

CPU

GPU2*0J 8ѓ *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_5130462
StatefulPartitionedCallђ
IdentityIdentity StatefulPartitionedCall:output:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityh
NoOpNoOp^StatefulPartitionedCall*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 22
StatefulPartitionedCallStatefulPartitionedCall:T P
,
_output_shapes
:         @ђ
 
_user_specified_nameinputs
├	
├
C__inference_encoder_layer_call_and_return_conditional_losses_513054
features 
dense_513047:
ђђ
dense_513049:	ђ
identityѕбdense/StatefulPartitionedCallЈ
dense/StatefulPartitionedCallStatefulPartitionedCallfeaturesdense_513047dense_513049*
Tin
2*
Tout
2*
_collective_manager_ids
 *,
_output_shapes
:         @ђ*$
_read_only_resource_inputs
*0
config_proto 

CPU

GPU2*0J 8ѓ *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_5130462
dense/StatefulPartitionedCalls
ReluRelu&dense/StatefulPartitionedCall:output:0*
T0*,
_output_shapes
:         @ђ2
Relur
IdentityIdentityRelu:activations:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityn
NoOpNoOp^dense/StatefulPartitionedCall*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 2>
dense/StatefulPartitionedCalldense/StatefulPartitionedCall:V R
,
_output_shapes
:         @ђ
"
_user_specified_name
features
Д+
ћ
!__inference__wrapped_model_513009
input_1C
/encoder_dense_tensordot_readvariableop_resource:
ђђ<
-encoder_dense_biasadd_readvariableop_resource:	ђ
identityѕб$encoder/dense/BiasAdd/ReadVariableOpб&encoder/dense/Tensordot/ReadVariableOp┬
&encoder/dense/Tensordot/ReadVariableOpReadVariableOp/encoder_dense_tensordot_readvariableop_resource* 
_output_shapes
:
ђђ*
dtype02(
&encoder/dense/Tensordot/ReadVariableOpє
encoder/dense/Tensordot/axesConst*
_output_shapes
:*
dtype0*
valueB:2
encoder/dense/Tensordot/axesЇ
encoder/dense/Tensordot/freeConst*
_output_shapes
:*
dtype0*
valueB"       2
encoder/dense/Tensordot/freeu
encoder/dense/Tensordot/ShapeShapeinput_1*
T0*
_output_shapes
:2
encoder/dense/Tensordot/Shapeљ
%encoder/dense/Tensordot/GatherV2/axisConst*
_output_shapes
: *
dtype0*
value	B : 2'
%encoder/dense/Tensordot/GatherV2/axisЌ
 encoder/dense/Tensordot/GatherV2GatherV2&encoder/dense/Tensordot/Shape:output:0%encoder/dense/Tensordot/free:output:0.encoder/dense/Tensordot/GatherV2/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2"
 encoder/dense/Tensordot/GatherV2ћ
'encoder/dense/Tensordot/GatherV2_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2)
'encoder/dense/Tensordot/GatherV2_1/axisЮ
"encoder/dense/Tensordot/GatherV2_1GatherV2&encoder/dense/Tensordot/Shape:output:0%encoder/dense/Tensordot/axes:output:00encoder/dense/Tensordot/GatherV2_1/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2$
"encoder/dense/Tensordot/GatherV2_1ѕ
encoder/dense/Tensordot/ConstConst*
_output_shapes
:*
dtype0*
valueB: 2
encoder/dense/Tensordot/ConstИ
encoder/dense/Tensordot/ProdProd)encoder/dense/Tensordot/GatherV2:output:0&encoder/dense/Tensordot/Const:output:0*
T0*
_output_shapes
: 2
encoder/dense/Tensordot/Prodї
encoder/dense/Tensordot/Const_1Const*
_output_shapes
:*
dtype0*
valueB: 2!
encoder/dense/Tensordot/Const_1└
encoder/dense/Tensordot/Prod_1Prod+encoder/dense/Tensordot/GatherV2_1:output:0(encoder/dense/Tensordot/Const_1:output:0*
T0*
_output_shapes
: 2 
encoder/dense/Tensordot/Prod_1ї
#encoder/dense/Tensordot/concat/axisConst*
_output_shapes
: *
dtype0*
value	B : 2%
#encoder/dense/Tensordot/concat/axisШ
encoder/dense/Tensordot/concatConcatV2%encoder/dense/Tensordot/free:output:0%encoder/dense/Tensordot/axes:output:0,encoder/dense/Tensordot/concat/axis:output:0*
N*
T0*
_output_shapes
:2 
encoder/dense/Tensordot/concat─
encoder/dense/Tensordot/stackPack%encoder/dense/Tensordot/Prod:output:0'encoder/dense/Tensordot/Prod_1:output:0*
N*
T0*
_output_shapes
:2
encoder/dense/Tensordot/stack╝
!encoder/dense/Tensordot/transpose	Transposeinput_1'encoder/dense/Tensordot/concat:output:0*
T0*,
_output_shapes
:         @ђ2#
!encoder/dense/Tensordot/transposeО
encoder/dense/Tensordot/ReshapeReshape%encoder/dense/Tensordot/transpose:y:0&encoder/dense/Tensordot/stack:output:0*
T0*0
_output_shapes
:                  2!
encoder/dense/Tensordot/ReshapeО
encoder/dense/Tensordot/MatMulMatMul(encoder/dense/Tensordot/Reshape:output:0.encoder/dense/Tensordot/ReadVariableOp:value:0*
T0*(
_output_shapes
:         ђ2 
encoder/dense/Tensordot/MatMulЇ
encoder/dense/Tensordot/Const_2Const*
_output_shapes
:*
dtype0*
valueB:ђ2!
encoder/dense/Tensordot/Const_2љ
%encoder/dense/Tensordot/concat_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2'
%encoder/dense/Tensordot/concat_1/axisЃ
 encoder/dense/Tensordot/concat_1ConcatV2)encoder/dense/Tensordot/GatherV2:output:0(encoder/dense/Tensordot/Const_2:output:0.encoder/dense/Tensordot/concat_1/axis:output:0*
N*
T0*
_output_shapes
:2"
 encoder/dense/Tensordot/concat_1╔
encoder/dense/TensordotReshape(encoder/dense/Tensordot/MatMul:product:0)encoder/dense/Tensordot/concat_1:output:0*
T0*,
_output_shapes
:         @ђ2
encoder/dense/Tensordotи
$encoder/dense/BiasAdd/ReadVariableOpReadVariableOp-encoder_dense_biasadd_readvariableop_resource*
_output_shapes	
:ђ*
dtype02&
$encoder/dense/BiasAdd/ReadVariableOp└
encoder/dense/BiasAddBiasAdd encoder/dense/Tensordot:output:0,encoder/dense/BiasAdd/ReadVariableOp:value:0*
T0*,
_output_shapes
:         @ђ2
encoder/dense/BiasAdd{
encoder/ReluReluencoder/dense/BiasAdd:output:0*
T0*,
_output_shapes
:         @ђ2
encoder/Reluz
IdentityIdentityencoder/Relu:activations:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityъ
NoOpNoOp%^encoder/dense/BiasAdd/ReadVariableOp'^encoder/dense/Tensordot/ReadVariableOp*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 2L
$encoder/dense/BiasAdd/ReadVariableOp$encoder/dense/BiasAdd/ReadVariableOp2P
&encoder/dense/Tensordot/ReadVariableOp&encoder/dense/Tensordot/ReadVariableOp:U Q
,
_output_shapes
:         @ђ
!
_user_specified_name	input_1
№%
Ќ
C__inference_encoder_layer_call_and_return_conditional_losses_513150
features;
'dense_tensordot_readvariableop_resource:
ђђ4
%dense_biasadd_readvariableop_resource:	ђ
identityѕбdense/BiasAdd/ReadVariableOpбdense/Tensordot/ReadVariableOpф
dense/Tensordot/ReadVariableOpReadVariableOp'dense_tensordot_readvariableop_resource* 
_output_shapes
:
ђђ*
dtype02 
dense/Tensordot/ReadVariableOpv
dense/Tensordot/axesConst*
_output_shapes
:*
dtype0*
valueB:2
dense/Tensordot/axes}
dense/Tensordot/freeConst*
_output_shapes
:*
dtype0*
valueB"       2
dense/Tensordot/freef
dense/Tensordot/ShapeShapefeatures*
T0*
_output_shapes
:2
dense/Tensordot/Shapeђ
dense/Tensordot/GatherV2/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
dense/Tensordot/GatherV2/axis№
dense/Tensordot/GatherV2GatherV2dense/Tensordot/Shape:output:0dense/Tensordot/free:output:0&dense/Tensordot/GatherV2/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
dense/Tensordot/GatherV2ё
dense/Tensordot/GatherV2_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2!
dense/Tensordot/GatherV2_1/axisш
dense/Tensordot/GatherV2_1GatherV2dense/Tensordot/Shape:output:0dense/Tensordot/axes:output:0(dense/Tensordot/GatherV2_1/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
dense/Tensordot/GatherV2_1x
dense/Tensordot/ConstConst*
_output_shapes
:*
dtype0*
valueB: 2
dense/Tensordot/Constў
dense/Tensordot/ProdProd!dense/Tensordot/GatherV2:output:0dense/Tensordot/Const:output:0*
T0*
_output_shapes
: 2
dense/Tensordot/Prod|
dense/Tensordot/Const_1Const*
_output_shapes
:*
dtype0*
valueB: 2
dense/Tensordot/Const_1а
dense/Tensordot/Prod_1Prod#dense/Tensordot/GatherV2_1:output:0 dense/Tensordot/Const_1:output:0*
T0*
_output_shapes
: 2
dense/Tensordot/Prod_1|
dense/Tensordot/concat/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
dense/Tensordot/concat/axis╬
dense/Tensordot/concatConcatV2dense/Tensordot/free:output:0dense/Tensordot/axes:output:0$dense/Tensordot/concat/axis:output:0*
N*
T0*
_output_shapes
:2
dense/Tensordot/concatц
dense/Tensordot/stackPackdense/Tensordot/Prod:output:0dense/Tensordot/Prod_1:output:0*
N*
T0*
_output_shapes
:2
dense/Tensordot/stackЦ
dense/Tensordot/transpose	Transposefeaturesdense/Tensordot/concat:output:0*
T0*,
_output_shapes
:         @ђ2
dense/Tensordot/transposeи
dense/Tensordot/ReshapeReshapedense/Tensordot/transpose:y:0dense/Tensordot/stack:output:0*
T0*0
_output_shapes
:                  2
dense/Tensordot/Reshapeи
dense/Tensordot/MatMulMatMul dense/Tensordot/Reshape:output:0&dense/Tensordot/ReadVariableOp:value:0*
T0*(
_output_shapes
:         ђ2
dense/Tensordot/MatMul}
dense/Tensordot/Const_2Const*
_output_shapes
:*
dtype0*
valueB:ђ2
dense/Tensordot/Const_2ђ
dense/Tensordot/concat_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
dense/Tensordot/concat_1/axis█
dense/Tensordot/concat_1ConcatV2!dense/Tensordot/GatherV2:output:0 dense/Tensordot/Const_2:output:0&dense/Tensordot/concat_1/axis:output:0*
N*
T0*
_output_shapes
:2
dense/Tensordot/concat_1Е
dense/TensordotReshape dense/Tensordot/MatMul:product:0!dense/Tensordot/concat_1:output:0*
T0*,
_output_shapes
:         @ђ2
dense/TensordotЪ
dense/BiasAdd/ReadVariableOpReadVariableOp%dense_biasadd_readvariableop_resource*
_output_shapes	
:ђ*
dtype02
dense/BiasAdd/ReadVariableOpа
dense/BiasAddBiasAdddense/Tensordot:output:0$dense/BiasAdd/ReadVariableOp:value:0*
T0*,
_output_shapes
:         @ђ2
dense/BiasAddc
ReluReludense/BiasAdd:output:0*
T0*,
_output_shapes
:         @ђ2
Relur
IdentityIdentityRelu:activations:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityј
NoOpNoOp^dense/BiasAdd/ReadVariableOp^dense/Tensordot/ReadVariableOp*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 2<
dense/BiasAdd/ReadVariableOpdense/BiasAdd/ReadVariableOp2@
dense/Tensordot/ReadVariableOpdense/Tensordot/ReadVariableOp:V R
,
_output_shapes
:         @ђ
"
_user_specified_name
features
у
Ћ
$__inference_signature_wrapper_513101
input_1
unknown:
ђђ
	unknown_0:	ђ
identityѕбStatefulPartitionedCall┌
StatefulPartitionedCallStatefulPartitionedCallinput_1unknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *,
_output_shapes
:         @ђ*$
_read_only_resource_inputs
*0
config_proto 

CPU

GPU2*0J 8ѓ **
f%R#
!__inference__wrapped_model_5130092
StatefulPartitionedCallђ
IdentityIdentity StatefulPartitionedCall:output:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityh
NoOpNoOp^StatefulPartitionedCall*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 22
StatefulPartitionedCallStatefulPartitionedCall:U Q
,
_output_shapes
:         @ђ
!
_user_specified_name	input_1
ф
н
__inference__traced_save_513249
file_prefix3
/savev2_encoder_dense_kernel_read_readvariableop1
-savev2_encoder_dense_bias_read_readvariableop
savev2_const

identity_1ѕбMergeV2CheckpointsЈ
StaticRegexFullMatchStaticRegexFullMatchfile_prefix"/device:CPU:**
_output_shapes
: *
pattern
^s3://.*2
StaticRegexFullMatchc
ConstConst"/device:CPU:**
_output_shapes
: *
dtype0*
valueB B.part2
Constl
Const_1Const"/device:CPU:**
_output_shapes
: *
dtype0*
valueB B
_temp/part2	
Const_1І
SelectSelectStaticRegexFullMatch:output:0Const:output:0Const_1:output:0"/device:CPU:**
T0*
_output_shapes
: 2
Selectt

StringJoin
StringJoinfile_prefixSelect:output:0"/device:CPU:**
N*
_output_shapes
: 2

StringJoinZ

num_shardsConst*
_output_shapes
: *
dtype0*
value	B :2

num_shards
ShardedFilename/shardConst"/device:CPU:0*
_output_shapes
: *
dtype0*
value	B : 2
ShardedFilename/shardд
ShardedFilenameShardedFilenameStringJoin:output:0ShardedFilename/shard:output:0num_shards:output:0"/device:CPU:0*
_output_shapes
: 2
ShardedFilename№
SaveV2/tensor_namesConst"/device:CPU:0*
_output_shapes
:*
dtype0*Ђ
valuexBvB'dense/kernel/.ATTRIBUTES/VARIABLE_VALUEB%dense/bias/.ATTRIBUTES/VARIABLE_VALUEB_CHECKPOINTABLE_OBJECT_GRAPH2
SaveV2/tensor_namesј
SaveV2/shape_and_slicesConst"/device:CPU:0*
_output_shapes
:*
dtype0*
valueBB B B 2
SaveV2/shape_and_slicesю
SaveV2SaveV2ShardedFilename:filename:0SaveV2/tensor_names:output:0 SaveV2/shape_and_slices:output:0/savev2_encoder_dense_kernel_read_readvariableop-savev2_encoder_dense_bias_read_readvariableopsavev2_const"/device:CPU:0*
_output_shapes
 *
dtypes
22
SaveV2║
&MergeV2Checkpoints/checkpoint_prefixesPackShardedFilename:filename:0^SaveV2"/device:CPU:0*
N*
T0*
_output_shapes
:2(
&MergeV2Checkpoints/checkpoint_prefixesА
MergeV2CheckpointsMergeV2Checkpoints/MergeV2Checkpoints/checkpoint_prefixes:output:0file_prefix"/device:CPU:0*
_output_shapes
 2
MergeV2Checkpointsr
IdentityIdentityfile_prefix^MergeV2Checkpoints"/device:CPU:0*
T0*
_output_shapes
: 2

Identity_

Identity_1IdentityIdentity:output:0^NoOp*
T0*
_output_shapes
: 2

Identity_1c
NoOpNoOp^MergeV2Checkpoints*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"!

identity_1Identity_1:output:0**
_input_shapes
: :
ђђ:ђ: 2(
MergeV2CheckpointsMergeV2Checkpoints:C ?

_output_shapes
: 
%
_user_specified_namefile_prefix:&"
 
_output_shapes
:
ђђ:!

_output_shapes	
:ђ:

_output_shapes
: 
љ
џ
(__inference_encoder_layer_call_fn_513119
features
unknown:
ђђ
	unknown_0:	ђ
identityѕбStatefulPartitionedCall§
StatefulPartitionedCallStatefulPartitionedCallfeaturesunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *,
_output_shapes
:         @ђ*$
_read_only_resource_inputs
*0
config_proto 

CPU

GPU2*0J 8ѓ *L
fGRE
C__inference_encoder_layer_call_and_return_conditional_losses_5130542
StatefulPartitionedCallђ
IdentityIdentity StatefulPartitionedCall:output:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityh
NoOpNoOp^StatefulPartitionedCall*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 22
StatefulPartitionedCallStatefulPartitionedCall:V R
,
_output_shapes
:         @ђ
"
_user_specified_name
features
▄
р
"__inference__traced_restore_513265
file_prefix9
%assignvariableop_encoder_dense_kernel:
ђђ4
%assignvariableop_1_encoder_dense_bias:	ђ

identity_3ѕбAssignVariableOpбAssignVariableOp_1ш
RestoreV2/tensor_namesConst"/device:CPU:0*
_output_shapes
:*
dtype0*Ђ
valuexBvB'dense/kernel/.ATTRIBUTES/VARIABLE_VALUEB%dense/bias/.ATTRIBUTES/VARIABLE_VALUEB_CHECKPOINTABLE_OBJECT_GRAPH2
RestoreV2/tensor_namesћ
RestoreV2/shape_and_slicesConst"/device:CPU:0*
_output_shapes
:*
dtype0*
valueBB B B 2
RestoreV2/shape_and_slices║
	RestoreV2	RestoreV2file_prefixRestoreV2/tensor_names:output:0#RestoreV2/shape_and_slices:output:0"/device:CPU:0* 
_output_shapes
:::*
dtypes
22
	RestoreV2g
IdentityIdentityRestoreV2:tensors:0"/device:CPU:0*
T0*
_output_shapes
:2

Identityц
AssignVariableOpAssignVariableOp%assignvariableop_encoder_dense_kernelIdentity:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOpk

Identity_1IdentityRestoreV2:tensors:1"/device:CPU:0*
T0*
_output_shapes
:2

Identity_1ф
AssignVariableOp_1AssignVariableOp%assignvariableop_1_encoder_dense_biasIdentity_1:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_19
NoOpNoOp"/device:CPU:0*
_output_shapes
 2
NoOpљ

Identity_2Identityfile_prefix^AssignVariableOp^AssignVariableOp_1^NoOp"/device:CPU:0*
T0*
_output_shapes
: 2

Identity_2c

Identity_3IdentityIdentity_2:output:0^NoOp_1*
T0*
_output_shapes
: 2

Identity_3z
NoOp_1NoOp^AssignVariableOp^AssignVariableOp_1*"
_acd_function_control_output(*
_output_shapes
 2
NoOp_1"!

identity_3Identity_3:output:0*
_input_shapes
: : : 2$
AssignVariableOpAssignVariableOp2(
AssignVariableOp_1AssignVariableOp_1:C ?

_output_shapes
: 
%
_user_specified_namefile_prefix
в%
ќ
C__inference_encoder_layer_call_and_return_conditional_losses_513181
input_1;
'dense_tensordot_readvariableop_resource:
ђђ4
%dense_biasadd_readvariableop_resource:	ђ
identityѕбdense/BiasAdd/ReadVariableOpбdense/Tensordot/ReadVariableOpф
dense/Tensordot/ReadVariableOpReadVariableOp'dense_tensordot_readvariableop_resource* 
_output_shapes
:
ђђ*
dtype02 
dense/Tensordot/ReadVariableOpv
dense/Tensordot/axesConst*
_output_shapes
:*
dtype0*
valueB:2
dense/Tensordot/axes}
dense/Tensordot/freeConst*
_output_shapes
:*
dtype0*
valueB"       2
dense/Tensordot/freee
dense/Tensordot/ShapeShapeinput_1*
T0*
_output_shapes
:2
dense/Tensordot/Shapeђ
dense/Tensordot/GatherV2/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
dense/Tensordot/GatherV2/axis№
dense/Tensordot/GatherV2GatherV2dense/Tensordot/Shape:output:0dense/Tensordot/free:output:0&dense/Tensordot/GatherV2/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
dense/Tensordot/GatherV2ё
dense/Tensordot/GatherV2_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2!
dense/Tensordot/GatherV2_1/axisш
dense/Tensordot/GatherV2_1GatherV2dense/Tensordot/Shape:output:0dense/Tensordot/axes:output:0(dense/Tensordot/GatherV2_1/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
dense/Tensordot/GatherV2_1x
dense/Tensordot/ConstConst*
_output_shapes
:*
dtype0*
valueB: 2
dense/Tensordot/Constў
dense/Tensordot/ProdProd!dense/Tensordot/GatherV2:output:0dense/Tensordot/Const:output:0*
T0*
_output_shapes
: 2
dense/Tensordot/Prod|
dense/Tensordot/Const_1Const*
_output_shapes
:*
dtype0*
valueB: 2
dense/Tensordot/Const_1а
dense/Tensordot/Prod_1Prod#dense/Tensordot/GatherV2_1:output:0 dense/Tensordot/Const_1:output:0*
T0*
_output_shapes
: 2
dense/Tensordot/Prod_1|
dense/Tensordot/concat/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
dense/Tensordot/concat/axis╬
dense/Tensordot/concatConcatV2dense/Tensordot/free:output:0dense/Tensordot/axes:output:0$dense/Tensordot/concat/axis:output:0*
N*
T0*
_output_shapes
:2
dense/Tensordot/concatц
dense/Tensordot/stackPackdense/Tensordot/Prod:output:0dense/Tensordot/Prod_1:output:0*
N*
T0*
_output_shapes
:2
dense/Tensordot/stackц
dense/Tensordot/transpose	Transposeinput_1dense/Tensordot/concat:output:0*
T0*,
_output_shapes
:         @ђ2
dense/Tensordot/transposeи
dense/Tensordot/ReshapeReshapedense/Tensordot/transpose:y:0dense/Tensordot/stack:output:0*
T0*0
_output_shapes
:                  2
dense/Tensordot/Reshapeи
dense/Tensordot/MatMulMatMul dense/Tensordot/Reshape:output:0&dense/Tensordot/ReadVariableOp:value:0*
T0*(
_output_shapes
:         ђ2
dense/Tensordot/MatMul}
dense/Tensordot/Const_2Const*
_output_shapes
:*
dtype0*
valueB:ђ2
dense/Tensordot/Const_2ђ
dense/Tensordot/concat_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
dense/Tensordot/concat_1/axis█
dense/Tensordot/concat_1ConcatV2!dense/Tensordot/GatherV2:output:0 dense/Tensordot/Const_2:output:0&dense/Tensordot/concat_1/axis:output:0*
N*
T0*
_output_shapes
:2
dense/Tensordot/concat_1Е
dense/TensordotReshape dense/Tensordot/MatMul:product:0!dense/Tensordot/concat_1:output:0*
T0*,
_output_shapes
:         @ђ2
dense/TensordotЪ
dense/BiasAdd/ReadVariableOpReadVariableOp%dense_biasadd_readvariableop_resource*
_output_shapes	
:ђ*
dtype02
dense/BiasAdd/ReadVariableOpа
dense/BiasAddBiasAdddense/Tensordot:output:0$dense/BiasAdd/ReadVariableOp:value:0*
T0*,
_output_shapes
:         @ђ2
dense/BiasAddc
ReluReludense/BiasAdd:output:0*
T0*,
_output_shapes
:         @ђ2
Relur
IdentityIdentityRelu:activations:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityј
NoOpNoOp^dense/BiasAdd/ReadVariableOp^dense/Tensordot/ReadVariableOp*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 2<
dense/BiasAdd/ReadVariableOpdense/BiasAdd/ReadVariableOp2@
dense/Tensordot/ReadVariableOpdense/Tensordot/ReadVariableOp:U Q
,
_output_shapes
:         @ђ
!
_user_specified_name	input_1
ы 
ч
A__inference_dense_layer_call_and_return_conditional_losses_513046

inputs5
!tensordot_readvariableop_resource:
ђђ.
biasadd_readvariableop_resource:	ђ
identityѕбBiasAdd/ReadVariableOpбTensordot/ReadVariableOpў
Tensordot/ReadVariableOpReadVariableOp!tensordot_readvariableop_resource* 
_output_shapes
:
ђђ*
dtype02
Tensordot/ReadVariableOpj
Tensordot/axesConst*
_output_shapes
:*
dtype0*
valueB:2
Tensordot/axesq
Tensordot/freeConst*
_output_shapes
:*
dtype0*
valueB"       2
Tensordot/freeX
Tensordot/ShapeShapeinputs*
T0*
_output_shapes
:2
Tensordot/Shapet
Tensordot/GatherV2/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/GatherV2/axisЛ
Tensordot/GatherV2GatherV2Tensordot/Shape:output:0Tensordot/free:output:0 Tensordot/GatherV2/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
Tensordot/GatherV2x
Tensordot/GatherV2_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/GatherV2_1/axisО
Tensordot/GatherV2_1GatherV2Tensordot/Shape:output:0Tensordot/axes:output:0"Tensordot/GatherV2_1/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
Tensordot/GatherV2_1l
Tensordot/ConstConst*
_output_shapes
:*
dtype0*
valueB: 2
Tensordot/Constђ
Tensordot/ProdProdTensordot/GatherV2:output:0Tensordot/Const:output:0*
T0*
_output_shapes
: 2
Tensordot/Prodp
Tensordot/Const_1Const*
_output_shapes
:*
dtype0*
valueB: 2
Tensordot/Const_1ѕ
Tensordot/Prod_1ProdTensordot/GatherV2_1:output:0Tensordot/Const_1:output:0*
T0*
_output_shapes
: 2
Tensordot/Prod_1p
Tensordot/concat/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/concat/axis░
Tensordot/concatConcatV2Tensordot/free:output:0Tensordot/axes:output:0Tensordot/concat/axis:output:0*
N*
T0*
_output_shapes
:2
Tensordot/concatї
Tensordot/stackPackTensordot/Prod:output:0Tensordot/Prod_1:output:0*
N*
T0*
_output_shapes
:2
Tensordot/stackЉ
Tensordot/transpose	TransposeinputsTensordot/concat:output:0*
T0*,
_output_shapes
:         @ђ2
Tensordot/transposeЪ
Tensordot/ReshapeReshapeTensordot/transpose:y:0Tensordot/stack:output:0*
T0*0
_output_shapes
:                  2
Tensordot/ReshapeЪ
Tensordot/MatMulMatMulTensordot/Reshape:output:0 Tensordot/ReadVariableOp:value:0*
T0*(
_output_shapes
:         ђ2
Tensordot/MatMulq
Tensordot/Const_2Const*
_output_shapes
:*
dtype0*
valueB:ђ2
Tensordot/Const_2t
Tensordot/concat_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/concat_1/axisй
Tensordot/concat_1ConcatV2Tensordot/GatherV2:output:0Tensordot/Const_2:output:0 Tensordot/concat_1/axis:output:0*
N*
T0*
_output_shapes
:2
Tensordot/concat_1Љ
	TensordotReshapeTensordot/MatMul:product:0Tensordot/concat_1:output:0*
T0*,
_output_shapes
:         @ђ2
	TensordotЇ
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes	
:ђ*
dtype02
BiasAdd/ReadVariableOpѕ
BiasAddBiasAddTensordot:output:0BiasAdd/ReadVariableOp:value:0*
T0*,
_output_shapes
:         @ђ2	
BiasAddp
IdentityIdentityBiasAdd:output:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityѓ
NoOpNoOp^BiasAdd/ReadVariableOp^Tensordot/ReadVariableOp*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp24
Tensordot/ReadVariableOpTensordot/ReadVariableOp:T P
,
_output_shapes
:         @ђ
 
_user_specified_nameinputs
Ї
Ў
(__inference_encoder_layer_call_fn_513110
input_1
unknown:
ђђ
	unknown_0:	ђ
identityѕбStatefulPartitionedCallЧ
StatefulPartitionedCallStatefulPartitionedCallinput_1unknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *,
_output_shapes
:         @ђ*$
_read_only_resource_inputs
*0
config_proto 

CPU

GPU2*0J 8ѓ *L
fGRE
C__inference_encoder_layer_call_and_return_conditional_losses_5130542
StatefulPartitionedCallђ
IdentityIdentity StatefulPartitionedCall:output:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityh
NoOpNoOp^StatefulPartitionedCall*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 22
StatefulPartitionedCallStatefulPartitionedCall:U Q
,
_output_shapes
:         @ђ
!
_user_specified_name	input_1
ы 
ч
A__inference_dense_layer_call_and_return_conditional_losses_513220

inputs5
!tensordot_readvariableop_resource:
ђђ.
biasadd_readvariableop_resource:	ђ
identityѕбBiasAdd/ReadVariableOpбTensordot/ReadVariableOpў
Tensordot/ReadVariableOpReadVariableOp!tensordot_readvariableop_resource* 
_output_shapes
:
ђђ*
dtype02
Tensordot/ReadVariableOpj
Tensordot/axesConst*
_output_shapes
:*
dtype0*
valueB:2
Tensordot/axesq
Tensordot/freeConst*
_output_shapes
:*
dtype0*
valueB"       2
Tensordot/freeX
Tensordot/ShapeShapeinputs*
T0*
_output_shapes
:2
Tensordot/Shapet
Tensordot/GatherV2/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/GatherV2/axisЛ
Tensordot/GatherV2GatherV2Tensordot/Shape:output:0Tensordot/free:output:0 Tensordot/GatherV2/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
Tensordot/GatherV2x
Tensordot/GatherV2_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/GatherV2_1/axisО
Tensordot/GatherV2_1GatherV2Tensordot/Shape:output:0Tensordot/axes:output:0"Tensordot/GatherV2_1/axis:output:0*
Taxis0*
Tindices0*
Tparams0*
_output_shapes
:2
Tensordot/GatherV2_1l
Tensordot/ConstConst*
_output_shapes
:*
dtype0*
valueB: 2
Tensordot/Constђ
Tensordot/ProdProdTensordot/GatherV2:output:0Tensordot/Const:output:0*
T0*
_output_shapes
: 2
Tensordot/Prodp
Tensordot/Const_1Const*
_output_shapes
:*
dtype0*
valueB: 2
Tensordot/Const_1ѕ
Tensordot/Prod_1ProdTensordot/GatherV2_1:output:0Tensordot/Const_1:output:0*
T0*
_output_shapes
: 2
Tensordot/Prod_1p
Tensordot/concat/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/concat/axis░
Tensordot/concatConcatV2Tensordot/free:output:0Tensordot/axes:output:0Tensordot/concat/axis:output:0*
N*
T0*
_output_shapes
:2
Tensordot/concatї
Tensordot/stackPackTensordot/Prod:output:0Tensordot/Prod_1:output:0*
N*
T0*
_output_shapes
:2
Tensordot/stackЉ
Tensordot/transpose	TransposeinputsTensordot/concat:output:0*
T0*,
_output_shapes
:         @ђ2
Tensordot/transposeЪ
Tensordot/ReshapeReshapeTensordot/transpose:y:0Tensordot/stack:output:0*
T0*0
_output_shapes
:                  2
Tensordot/ReshapeЪ
Tensordot/MatMulMatMulTensordot/Reshape:output:0 Tensordot/ReadVariableOp:value:0*
T0*(
_output_shapes
:         ђ2
Tensordot/MatMulq
Tensordot/Const_2Const*
_output_shapes
:*
dtype0*
valueB:ђ2
Tensordot/Const_2t
Tensordot/concat_1/axisConst*
_output_shapes
: *
dtype0*
value	B : 2
Tensordot/concat_1/axisй
Tensordot/concat_1ConcatV2Tensordot/GatherV2:output:0Tensordot/Const_2:output:0 Tensordot/concat_1/axis:output:0*
N*
T0*
_output_shapes
:2
Tensordot/concat_1Љ
	TensordotReshapeTensordot/MatMul:product:0Tensordot/concat_1:output:0*
T0*,
_output_shapes
:         @ђ2
	TensordotЇ
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes	
:ђ*
dtype02
BiasAdd/ReadVariableOpѕ
BiasAddBiasAddTensordot:output:0BiasAdd/ReadVariableOp:value:0*
T0*,
_output_shapes
:         @ђ2	
BiasAddp
IdentityIdentityBiasAdd:output:0^NoOp*
T0*,
_output_shapes
:         @ђ2

Identityѓ
NoOpNoOp^BiasAdd/ReadVariableOp^Tensordot/ReadVariableOp*"
_acd_function_control_output(*
_output_shapes
 2
NoOp"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*/
_input_shapes
:         @ђ: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp24
Tensordot/ReadVariableOpTensordot/ReadVariableOp:T P
,
_output_shapes
:         @ђ
 
_user_specified_nameinputs"еL
saver_filename:0StatefulPartitionedCall_1:0StatefulPartitionedCall_28"
saved_model_main_op

NoOp*>
__saved_model_init_op%#
__saved_model_init_op

NoOp*х
serving_defaultА
@
input_15
serving_default_input_1:0         @ђA
output_15
StatefulPartitionedCall:0         @ђtensorflow/serving/predict:■"
П
	dense
	variables
trainable_variables
regularization_losses
	keras_api

signatures
__call__
*&call_and_return_all_conditional_losses
_default_save_signature"
_tf_keras_model
╗

kernel
bias
		variables

trainable_variables
regularization_losses
	keras_api
__call__
*&call_and_return_all_conditional_losses"
_tf_keras_layer
.
0
1"
trackable_list_wrapper
.
0
1"
trackable_list_wrapper
 "
trackable_list_wrapper
╩
	variables
non_trainable_variables
trainable_variables
layer_metrics
metrics

layers
layer_regularization_losses
regularization_losses
__call__
_default_save_signature
*&call_and_return_all_conditional_losses
&"call_and_return_conditional_losses"
_generic_user_object
,
serving_default"
signature_map
(:&
ђђ2encoder/dense/kernel
!:ђ2encoder/dense/bias
.
0
1"
trackable_list_wrapper
.
0
1"
trackable_list_wrapper
 "
trackable_list_wrapper
Г
		variables
non_trainable_variables

trainable_variables
layer_metrics
metrics

layers
layer_regularization_losses
regularization_losses
__call__
*&call_and_return_all_conditional_losses
&"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
'
0"
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
■2ч
(__inference_encoder_layer_call_fn_513110
(__inference_encoder_layer_call_fn_513119ц
Џ▓Ќ
FullArgSpec
argsџ
jself

jfeatures
varargs
 
varkw
 
defaults
 

kwonlyargsџ 
kwonlydefaults
 
annotationsф *
 
┤2▒
C__inference_encoder_layer_call_and_return_conditional_losses_513150
C__inference_encoder_layer_call_and_return_conditional_losses_513181ц
Џ▓Ќ
FullArgSpec
argsџ
jself

jfeatures
varargs
 
varkw
 
defaults
 

kwonlyargsџ 
kwonlydefaults
 
annotationsф *
 
╠B╔
!__inference__wrapped_model_513009input_1"ў
Љ▓Ї
FullArgSpec
argsџ 
varargsjargs
varkwjkwargs
defaults
 

kwonlyargsџ 
kwonlydefaults
 
annotationsф *
 
л2═
&__inference_dense_layer_call_fn_513190б
Ў▓Ћ
FullArgSpec
argsџ
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargsџ 
kwonlydefaults
 
annotationsф *
 
в2У
A__inference_dense_layer_call_and_return_conditional_losses_513220б
Ў▓Ћ
FullArgSpec
argsџ
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargsџ 
kwonlydefaults
 
annotationsф *
 
╦B╚
$__inference_signature_wrapper_513101input_1"ћ
Ї▓Ѕ
FullArgSpec
argsџ 
varargs
 
varkwjkwargs
defaults
 

kwonlyargsџ 
kwonlydefaults
 
annotationsф *
 џ
!__inference__wrapped_model_513009u5б2
+б(
&і#
input_1         @ђ
ф "8ф5
3
output_1'і$
output_1         @ђФ
A__inference_dense_layer_call_and_return_conditional_losses_513220f4б1
*б'
%і"
inputs         @ђ
ф "*б'
 і
0         @ђ
џ Ѓ
&__inference_dense_layer_call_fn_513190Y4б1
*б'
%і"
inputs         @ђ
ф "і         @ђ»
C__inference_encoder_layer_call_and_return_conditional_losses_513150h6б3
,б)
'і$
features         @ђ
ф "*б'
 і
0         @ђ
џ «
C__inference_encoder_layer_call_and_return_conditional_losses_513181g5б2
+б(
&і#
input_1         @ђ
ф "*б'
 і
0         @ђ
џ є
(__inference_encoder_layer_call_fn_513110Z5б2
+б(
&і#
input_1         @ђ
ф "і         @ђЄ
(__inference_encoder_layer_call_fn_513119[6б3
,б)
'і$
features         @ђ
ф "і         @ђЕ
$__inference_signature_wrapper_513101ђ@б=
б 
6ф3
1
input_1&і#
input_1         @ђ"8ф5
3
output_1'і$
output_1         @ђ